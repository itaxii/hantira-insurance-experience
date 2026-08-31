import { describe, expect, it, vi } from "vitest";
import { isPresenterAllowListed, isPresenterSessionAllowed } from "./presenterAuth";

describe("presenter auth", () => {
  it("rejects missing and anonymous sessions", () => {
    expect(isPresenterSessionAllowed(null)).toBe(false);
    expect(isPresenterSessionAllowed({ id: "anon-user", is_anonymous: true })).toBe(false);
  });

  it("allows a non-anonymous authenticated presenter session", () => {
    expect(isPresenterSessionAllowed({ id: "presenter-user", is_anonymous: false })).toBe(true);
    expect(isPresenterSessionAllowed({ id: "presenter-user" })).toBe(true);
  });

  it("checks the database presenter allow-list before unlocking controls", async () => {
    const maybeSingle = vi.fn().mockResolvedValue({ data: { user_id: "presenter-user" }, error: null });
    const eq = vi.fn().mockReturnValue({ maybeSingle });
    const select = vi.fn().mockReturnValue({ eq });
    const from = vi.fn().mockReturnValue({ select });

    await expect(isPresenterAllowListed({ from } as never, { id: "presenter-user", is_anonymous: false } as never)).resolves.toBe(true);
    expect(from).toHaveBeenCalledWith("presenters");
    expect(eq).toHaveBeenCalledWith("user_id", "presenter-user");
  });
});
