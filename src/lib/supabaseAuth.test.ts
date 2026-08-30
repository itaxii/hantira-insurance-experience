import { describe, expect, it, vi } from "vitest";
import { ensureAnonymousAuth } from "./supabaseAuth";

describe("ensureAnonymousAuth", () => {
  it("reuses an existing anonymous session instead of creating a new user", async () => {
    const client = {
      auth: {
        getSession: vi.fn().mockResolvedValue({ data: { session: { user: { id: "user-1" } } } }),
        signInAnonymously: vi.fn()
      }
    };

    await expect(ensureAnonymousAuth(client as never)).resolves.toBe("user-1");
    expect(client.auth.signInAnonymously).not.toHaveBeenCalled();
  });

  it("creates an anonymous Supabase user when no session exists", async () => {
    const client = {
      auth: {
        getSession: vi.fn().mockResolvedValue({ data: { session: null } }),
        signInAnonymously: vi.fn().mockResolvedValue({ data: { user: { id: "anon-1" } }, error: null })
      }
    };

    await expect(ensureAnonymousAuth(client as never)).resolves.toBe("anon-1");
  });
});
