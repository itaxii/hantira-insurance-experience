import { ControlRoute } from "./ControlRoute";
import { JoinRoute } from "./JoinRoute";
import { PresentRoute } from "./PresentRoute";

export function App() {
  const path = window.location.pathname;
  if (path.startsWith("/join/")) return <JoinRoute roomCode={decodeURIComponent(path.split("/")[2] ?? "")} />;
  if (path === "/control") return <ControlRoute />;
  return <PresentRoute />;
}
