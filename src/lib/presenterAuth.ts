import type { SupabaseClient, User } from "@supabase/supabase-js";

type PresenterLikeUser = {
  id?: string;
  is_anonymous?: boolean;
} | null | undefined;

export function isPresenterSessionAllowed(user: PresenterLikeUser) {
  return Boolean(user?.id && user.is_anonymous !== true);
}

type PresenterLookupClient = Pick<SupabaseClient, "from">;

export async function isPresenterAllowListed(client: PresenterLookupClient, user: User | null) {
  if (!user) return false;
  if (!isPresenterSessionAllowed(user)) return false;
  const userId = user.id;
  const result = await client.from("presenters").select("user_id").eq("user_id", userId).maybeSingle();
  if (result.error) throw result.error;
  return Boolean(result.data);
}

export function presenterSecurityNote() {
  return "Production presenter access uses Supabase Auth plus the public.presenters allow-list table. Do not ship presenter passwords in VITE variables.";
}
