import { useEffect, useMemo, useState } from "react";
import { appConfig } from "../config";
import type { Participant, RoomState, VoteRecord } from "../types";
import { makeRoom } from "./roomState";

type Snapshot = {
  room: RoomState;
  participants: Participant[];
  votes: VoteRecord[];
};

const STORAGE = "hantira-local-room";
const listeners = new Set<(snapshot: Snapshot) => void>();

function loadSnapshot(): Snapshot {
  const raw = localStorage.getItem(STORAGE);
  if (raw) return JSON.parse(raw) as Snapshot;
  const snapshot = { room: makeRoom(appConfig.room.defaultCode), participants: [], votes: [] };
  localStorage.setItem(STORAGE, JSON.stringify(snapshot));
  return snapshot;
}

function saveSnapshot(snapshot: Snapshot) {
  localStorage.setItem(STORAGE, JSON.stringify(snapshot));
  listeners.forEach((listener) => listener(snapshot));
}

export function useLocalRoom() {
  const [snapshot, setSnapshot] = useState<Snapshot>(() => loadSnapshot());
  useEffect(() => {
    listeners.add(setSnapshot);
    return () => {
      listeners.delete(setSnapshot);
    };
  }, []);

  return useMemo(
    () => ({
      ...snapshot,
      updateRoom(patch: Partial<RoomState>) {
        saveSnapshot({ ...loadSnapshot(), room: { ...loadSnapshot().room, ...patch, updated_at: new Date().toISOString() } });
      },
      join(displayName: string, sessionId: string) {
        const current = loadSnapshot();
        const existing = current.participants.find((participant) => participant.session_id === sessionId);
        const now = new Date().toISOString();
        const participant: Participant = existing ?? {
          id: crypto.randomUUID(),
          room_id: current.room.id,
          session_id: sessionId,
          display_name: displayName,
          joined_at: now,
          last_seen_at: now
        };
        saveSnapshot({
          ...current,
          participants: [
            ...current.participants.filter((item) => item.session_id !== sessionId),
            { ...participant, display_name: displayName, last_seen_at: now }
          ]
        });
      },
      submitVote(questionId: string, sessionId: string, optionIds: string[], allowChange: boolean) {
        const current = loadSnapshot();
        const existing = current.votes.filter((vote) => vote.question_id === questionId && vote.participant_session_id === sessionId);
        if (existing.length && !allowChange) return false;
        const withoutExisting = current.votes.filter(
          (vote) => !(vote.question_id === questionId && vote.participant_session_id === sessionId)
        );
        const nextVotes = optionIds.map((optionId) => ({
          id: crypto.randomUUID(),
          room_id: current.room.id,
          question_id: questionId,
          participant_session_id: sessionId,
          option_id: optionId,
          created_at: new Date().toISOString(),
          participants: {
            display_name:
              current.participants.find((participant) => participant.session_id === sessionId)?.display_name ?? "Guest"
          }
        }));
        saveSnapshot({ ...current, votes: [...withoutExisting, ...nextVotes] });
        return true;
      },
      resetVotes(questionId?: string) {
        const current = loadSnapshot();
        saveSnapshot({ ...current, votes: questionId ? current.votes.filter((vote) => vote.question_id !== questionId) : [] });
      }
    }),
    [snapshot]
  );
}
