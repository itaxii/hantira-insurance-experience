export type NicknameResult =
  | { ok: true; value: string }
  | { ok: false; error: "name_required" | "name_too_short" | "name_too_long" };

export type NicknameError = Extract<NicknameResult, { ok: false }>["error"];

const CONTROL_CHARS = /[\u0000-\u001f\u007f]/g;
const HTML_DANGEROUS = /[<>"'`=]/g;

export function sanitizeNickname(raw: string): NicknameResult {
  const value = raw.normalize("NFKC").replace(CONTROL_CHARS, "").replace(HTML_DANGEROUS, "").trim();
  if (!value) return { ok: false, error: "name_required" };
  if ([...value].length < 2) return { ok: false, error: "name_too_short" };
  if ([...value].length > 24) return { ok: false, error: "name_too_long" };
  return { ok: true, value };
}

export function nicknameErrorMessage(error: NicknameError) {
  switch (error) {
    case "name_required":
      return "لازم تكتب اسم قبل ما تدخل الرحلة.";
    case "name_too_short":
      return "الاسم قصير جدًا — اكتب اسم من حرفين على الأقل.";
    case "name_too_long":
      return "الاسم طويل أوي — خليه 24 حرف بأقصى حدود.";
  }
}
