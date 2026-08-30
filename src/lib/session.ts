import type { VoteRecord } from "../types";

const KEY = "hantira-participant-session";

export type StoredSession = {
  participantSessionId: string;
  roomCode: string;
  nickname: string;
  votes: Record<string, string[]>;
};

export function createParticipantSessionId() {
  return crypto.randomUUID();
}

export function loadStoredSession(roomCode: string): StoredSession | null {
  try {
    const raw = localStorage.getItem(KEY);
    if (!raw) return null;
    const parsed = JSON.parse(raw) as StoredSession;
    return parsed.roomCode === roomCode && parsed.participantSessionId && parsed.nickname ? parsed : null;
  } catch {
    return null;
  }
}

export function saveStoredSession(session: StoredSession) {
  localStorage.setItem(KEY, JSON.stringify(session));
}

export function rememberVote(session: StoredSession, questionId: string, optionIds: string[]) {
  const next = { ...session, votes: { ...session.votes, [questionId]: optionIds } };
  saveStoredSession(next);
  return next;
}

export function selectedVotesFor(votes: VoteRecord[], participantSessionId: string, questionId: string) {
  return votes
    .filter((vote) => vote.participant_session_id === participantSessionId && vote.question_id === questionId)
    .map((vote) => vote.option_id);
}
