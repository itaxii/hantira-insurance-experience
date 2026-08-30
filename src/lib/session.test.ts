import { beforeEach, describe, expect, it } from "vitest";
import { loadStoredSession, rememberVote, saveStoredSession, selectedVotesFor } from "./session";

describe("participant persistence", () => {
  beforeEach(() => localStorage.clear());

  it("restores the nickname and session only for the current room", () => {
    saveStoredSession({ participantSessionId: "session-1", roomCode: "7284", nickname: "محمد", votes: {} });
    expect(loadStoredSession("7284")?.nickname).toBe("محمد");
    expect(loadStoredSession("9999")).toBeNull();
  });

  it("persists submitted choices by question after a refresh", () => {
    const next = rememberVote({ participantSessionId: "session-1", roomCode: "7284", nickname: "Mo", votes: {} }, "q1", [
      "motor",
      "medical"
    ]);
    expect(next.votes.q1).toEqual(["motor", "medical"]);
    expect(loadStoredSession("7284")?.votes.q1).toEqual(["motor", "medical"]);
  });

  it("retrieves only the participant personal vote for the active question", () => {
    expect(
      selectedVotesFor(
        [
          { room_id: "r", question_id: "q1", participant_session_id: "s1", option_id: "a" },
          { room_id: "r", question_id: "q2", participant_session_id: "s1", option_id: "b" },
          { room_id: "r", question_id: "q1", participant_session_id: "s2", option_id: "c" }
        ],
        "s1",
        "q1"
      )
    ).toEqual(["a"]);
  });
});
