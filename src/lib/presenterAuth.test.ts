import { describe, expect, it } from "vitest";
import { isPresenterSessionAllowed } from "./presenterAuth";

describe("presenter auth", () => {
  it("rejects missing and anonymous sessions", () => {
    expect(isPresenterSessionAllowed(null)).toBe(false);
    expect(isPresenterSessionAllowed({ id: "anon-user", is_anonymous: true })).toBe(false);
  });

  it("allows a non-anonymous authenticated presenter session", () => {
    expect(isPresenterSessionAllowed({ id: "presenter-user", is_anonymous: false })).toBe(true);
    expect(isPresenterSessionAllowed({ id: "presenter-user" })).toBe(true);
  });
});
