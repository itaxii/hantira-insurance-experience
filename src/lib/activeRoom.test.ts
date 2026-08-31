import { describe, expect, it, vi } from "vitest";
import { appConfig } from "../config";
import { readActiveRoomCode, writeActiveRoomCode } from "./activeRoom";

describe("active room code", () => {
  it("prefers the room query parameter so /present opens the room created in /control", () => {
    localStorage.setItem("hantira-active-room-code", "7284");

    expect(readActiveRoomCode("?room=9691")).toBe("9691");
  });

  it("persists the presenter-created room code for other presentation tabs", () => {
    const dispatch = vi.spyOn(window, "dispatchEvent");

    expect(writeActiveRoomCode("4067")).toBe("4067");
    expect(localStorage.getItem("hantira-active-room-code")).toBe("4067");
    expect(readActiveRoomCode("")).toBe("4067");
    expect(dispatch).toHaveBeenCalled();
  });

  it("falls back to the configured default for unsafe or missing codes", () => {
    localStorage.setItem("hantira-active-room-code", "<script>");

    expect(readActiveRoomCode("")).toBe(appConfig.room.defaultCode);
    expect(readActiveRoomCode("?room=abc")).toBe(appConfig.room.defaultCode);
  });
});
