const repoBase = "/hantira-insurance-experience";

export function normalizeAppPath(pathname: string) {
  if (pathname === repoBase) return "/";
  if (pathname.startsWith(`${repoBase}/`)) return pathname.slice(repoBase.length);
  return pathname;
}

export function appHref(path: string) {
  const normalized = path.startsWith("/") ? path : `/${path}`;
  return import.meta.env.BASE_URL === "/" ? normalized : `${import.meta.env.BASE_URL.replace(/\/$/, "")}${normalized}`;
}

export function joinUrl(origin: string, roomCode: string) {
  return `${origin}${appHref(`/join/${roomCode}`)}`;
}
