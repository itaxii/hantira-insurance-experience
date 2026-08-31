import { ControlRoute } from "./ControlRoute";
import { JoinRoute } from "./JoinRoute";
import { PresentRoute } from "./PresentRoute";
import { consumeRedirectPath, normalizeAppPath } from "../lib/routing";

export function App() {
  const path = consumeRedirectPath() ?? normalizeAppPath(window.location.pathname);
  if (path.startsWith("/join/")) return <JoinRoute roomCode={decodeURIComponent(path.split("/")[2] ?? "")} />;
  if (path === "/control") return <ControlRoute />;
  return <PresentRoute />;
}
