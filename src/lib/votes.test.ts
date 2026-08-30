import { describe, expect, it } from "vitest";
import { aggregateVotes, canSubmitVote } from "./votes";

describe("vote rules", () => {
  it("locks a participant vote when answer changes are disabled", () => {
    expect(canSubmitVote({ alreadyVoted: true, allowChange: false, votingOpen: true })).toBe(false);
  });

  it("allows changing a vote only while voting is open and the question permits changes", () => {
    expect(canSubmitVote({ alreadyVoted: true, allowChange: true, votingOpen: true })).toBe(true);
    expect(canSubmitVote({ alreadyVoted: false, allowChange: true, votingOpen: false })).toBe(false);
  });

  it("aggregates single and multi-select votes by option with participant names", () => {
    const result = aggregateVotes(
      [
        { room_id: "r", question_id: "q", option_id: "a", participant_session_id: "p1", displayName: "محمد" },
        { room_id: "r", question_id: "q", option_id: "d", participant_session_id: "p2", displayName: "Sara" },
        { room_id: "r", question_id: "q", option_id: "d", participant_session_id: "p3", displayName: "Batman" },
        { room_id: "r", question_id: "q", option_id: "motor", participant_session_id: "p1", displayName: "محمد" }
      ],
      ["a", "d", "motor"]
    );

    expect(result).toEqual([
      { optionId: "a", count: 1, percent: 25, names: ["محمد"] },
      { optionId: "d", count: 2, percent: 50, names: ["Sara", "Batman"] },
      { optionId: "motor", count: 1, percent: 25, names: ["محمد"] }
    ]);
  });
});
