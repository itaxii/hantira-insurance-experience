export function isPresenterSecretStrong(secret: string | undefined) {
  return Boolean(secret && secret.length >= 12);
}

export function verifyPresenterSecret(expected: string | undefined, provided: string) {
  return isPresenterSecretStrong(expected) && expected === provided;
}

export function presenterSecurityNote() {
  return "Production presenter access uses Supabase Auth and RLS. Do not ship presenter passwords in VITE variables.";
}
