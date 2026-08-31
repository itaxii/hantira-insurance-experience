type PresenterLikeUser = {
  id?: string;
  is_anonymous?: boolean;
} | null | undefined;

export function isPresenterSessionAllowed(user: PresenterLikeUser) {
  return Boolean(user?.id && user.is_anonymous !== true);
}

export function presenterSecurityNote() {
  return "Production presenter access uses Supabase Auth plus the public.presenters allow-list table. Do not ship presenter passwords in VITE variables.";
}
