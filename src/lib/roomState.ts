import type { RoomState, StoryPosition } from "../types";

export function makeRoom(code: string): RoomState {
  const now = new Date().toISOString();
  return {
    id: crypto.randomUUID(),
    code,
    status: "join",
    current_scene: 1,
    current_beat: 0,
    voting_open: false,
    answer_revealed: false,
    results_visible: false,
    names_visible: "hidden",
    active_interaction: null,
    joins_allowed: true,
    muted: false,
    updated_at: now
  };
}

export function applyPosition(room: RoomState, position: StoryPosition, activeInteraction: string | null): RoomState {
  return {
    ...room,
    current_scene: position.sceneIndex,
    current_beat: position.beatIndex,
    active_interaction: activeInteraction,
    voting_open: false,
    answer_revealed: false,
    results_visible: false,
    names_visible: "hidden",
    status: position.sceneIndex > 1 ? "live" : room.status,
    updated_at: new Date().toISOString()
  };
}

export function canJoinRoom(room: Pick<RoomState, "joins_allowed" | "status">) {
  return room.joins_allowed && room.status !== "ended";
}
