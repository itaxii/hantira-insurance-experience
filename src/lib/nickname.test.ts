import { describe, expect, it } from "vitest";
import { sanitizeNickname } from "./nickname";

describe("sanitizeNickname", () => {
  it("rejects whitespace-only names so anonymous empty identities cannot join", () => {
    expect(sanitizeNickname("     ")).toEqual({ ok: false, error: "name_required" });
  });

  it("removes HTML syntax while preserving Arabic, English, numbers, and normal emoji", () => {
    expect(sanitizeNickname("  <b>محمد Batman 😄</b>  ")).toEqual({
      ok: true,
      value: "bمحمد Batman 😄/b"
    });
  });

  it("rejects display names longer than 24 characters after trimming", () => {
    expect(sanitizeNickname("محمدمحمدمحمدمحمدمحمدمحمدمحمد")).toEqual({
      ok: false,
      error: "name_too_long"
    });
  });
});
