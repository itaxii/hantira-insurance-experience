import { describe, expect, it } from "vitest";
import { isPresenterSecretStrong, verifyPresenterSecret } from "./presenterAuth";

describe("presenter auth", () => {
  it("rejects short presenter secrets", () => {
    expect(isPresenterSecretStrong("1234567")).toBe(false);
  });

  it("uses exact configured presenter secret matching", () => {
    expect(verifyPresenterSecret("safe-presenter-pass", "safe-presenter-pass")).toBe(true);
    expect(verifyPresenterSecret("safe-presenter-pass", " safe-presenter-pass ")).toBe(false);
  });
});
