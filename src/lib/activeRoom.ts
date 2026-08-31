import { useCallback, useEffect, useState } from "react";
import { appConfig } from "../config";

export const activeRoomCodeKey = "hantira-active-room-code";
const roomCodePattern = /^\d{4,6}$/;

export function normalizeRoomCode(code: string | null | undefined) {
  const value = code?.trim() ?? "";
  return roomCodePattern.test(value) ? value : appConfig.room.defaultCode;
}

export function readActiveRoomCode(search = typeof window !== "undefined" ? window.location.search : "") {
  const queryCode = new URLSearchParams(search).get("room");
  if (queryCode) return normalizeRoomCode(queryCode);

  try {
    return normalizeRoomCode(window.localStorage.getItem(activeRoomCodeKey));
  } catch {
    return appConfig.room.defaultCode;
  }
}

export function writeActiveRoomCode(code: string) {
  const normalized = normalizeRoomCode(code);
  try {
    window.localStorage.setItem(activeRoomCodeKey, normalized);
    window.dispatchEvent(new CustomEvent("hantira-room-code-change", { detail: normalized }));
  } catch {
    return normalized;
  }
  return normalized;
}

export function useActiveRoomCode() {
  const [roomCode, setRoomCode] = useState(() => readActiveRoomCode());

  useEffect(() => {
    const updateFromStorage = () => setRoomCode(readActiveRoomCode(""));
    const updateFromCustomEvent = (event: Event) => {
      const detail = event instanceof CustomEvent ? event.detail : null;
      setRoomCode(normalizeRoomCode(typeof detail === "string" ? detail : null));
    };

    window.addEventListener("storage", updateFromStorage);
    window.addEventListener("hantira-room-code-change", updateFromCustomEvent);
    return () => {
      window.removeEventListener("storage", updateFromStorage);
      window.removeEventListener("hantira-room-code-change", updateFromCustomEvent);
    };
  }, []);

  const activateRoomCode = useCallback((code: string) => {
    const normalized = writeActiveRoomCode(code);
    setRoomCode(normalized);
    return normalized;
  }, []);

  return [roomCode, activateRoomCode] as const;
}
