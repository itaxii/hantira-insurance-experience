import { ControlRoute } from "./ControlRoute";
import { JoinRoute } from "./JoinRoute";
import { PresentRoute } from "./PresentRoute";
import { normalizeAppPath } from "../lib/routing";

export function App() {
  const path = normalizeAppPath(window.location.pathname);
  if (path.startsWith("/join/")) return <JoinRoute roomCode={decodeURIComponent(path.split("/")[2] ?? "")} />;
  if (path === "/control") return <ControlRoute />;
  return <PresentRoute />;
}
