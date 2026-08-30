import { describe, expect, it } from "vitest";
import { applyPosition, canJoinRoom, makeRoom } from "./roomState";

describe("room state", () => {
  it("new rooms start at the one-time join scene", () => {
    const room = makeRoom("7284");
    expect(room.current_scene).toBe(1);
    expect(room.status).toBe("join");
    expect(room.joins_allowed).toBe(true);
  });

  it("scene movement resets reveal and voting state for the next interaction", () => {
    const room = { ...makeRoom("7284"), voting_open: true, results_visible: true, answer_revealed: true };
    const next = applyPosition(room, { sceneIndex: 4, beatIndex: 0 }, "who-pays");
    expect(next.voting_open).toBe(false);
    expect(next.results_visible).toBe(false);
    expect(next.answer_revealed).toBe(false);
    expect(next.active_interaction).toBe("who-pays");
  });

  it("late join lock prevents new audience sessions without ending connected participants", () => {
    expect(canJoinRoom({ joins_allowed: false, status: "live" })).toBe(false);
    expect(canJoinRoom({ joins_allowed: true, status: "live" })).toBe(true);
  });
});
