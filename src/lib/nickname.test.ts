import { describe, expect, it } from "vitest";
import { nicknameErrorMessage, sanitizeNickname } from "./nickname";

describe("sanitizeNickname", () => {
  it("rejects whitespace-only names so anonymous empty identities cannot join", () => {
    expect(sanitizeNickname("     ")).toEqual({ ok: false, error: "name_required" });
  });

  it("removes HTML syntax while preserving Arabic and English", () => {
    expect(sanitizeNickname("  <b>محمد Batman مصطفى,</b>  ")).toEqual({
      ok: true,
      value: "bمحمد Batman مصطفى,/b"
    });
  });

  it("rejects display names longer than 24 characters after trimming", () => {
    expect(sanitizeNickname("ط".repeat(25))).toEqual({
      ok: false,
      error: "name_too_long"
    });
  });

  it("returns readable Arabic error messages (regression: no mojibake)", () => {
    expect(nicknameErrorMessage("name_required")).toContain("اسم");
    expect(nicknameErrorMessage("name_too_short")).toContain("حرفين");
    expect(nicknameErrorMessage("name_too_long")).toContain("24");
  });
});
