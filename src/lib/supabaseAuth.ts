import type { SupabaseClient } from "@supabase/supabase-js";

type MinimalAuthClient = Pick<SupabaseClient, "auth">;

export async function ensureAnonymousAuth(client: MinimalAuthClient) {
  const existing = await client.auth.getSession();
  if (existing.data.session?.user) return existing.data.session.user.id;
  const created = await client.auth.signInAnonymously();
  if (created.error) throw created.error;
  if (!created.data.user?.id) throw new Error("anonymous_auth_failed");
  return created.data.user.id;
}
