import { Copy, Eye, EyeOff, Lock, RotateCcw, Search, Users } from "lucide-react";
import { useMemo, useState } from "react";
import { scenes } from "../data/scenes";
import { useExperienceStore } from "../lib/experienceStore";
import { applyPosition, makeRoom } from "../lib/roomState";
import { moveBeat } from "../lib/story";

export function ControlRoute() {
  const store = useExperienceStore();
  const [query, setQuery] = useState("");
  const scene = scenes[store.room.current_scene];
  const interaction = scene?.interaction;
  const filtered = store.participants.filter((participant) => participant.display_name.toLowerCase().includes(query.toLowerCase()));

  const go = (direction: "next" | "previous") => {
    const next = moveBeat(scenes, { sceneIndex: store.room.current_scene, beatIndex: store.room.current_beat }, direction);
    const nextScene = scenes[next.sceneIndex];
    store.updateRoom(applyPosition(store.room, next, nextScene.interaction?.id ?? null));
  };

  const joinUrl = useMemo(() => `${window.location.origin}/join/${store.room.code}`, [store.room.code]);

  return (
    <main className="control">
      <header>
        <div>
          <p className="eyebrow">Presenter Control</p>
          <h1>حنتيرة في عالم التأمين</h1>
        </div>
        <a href="/present" target="_blank">Open /present</a>
      </header>
      <section className="control-grid">
        <div className="control-panel">
          <h2>Room</h2>
          <p className="room-code">Room: {store.room.code}</p>
          <p>{joinUrl}</p>
          <button onClick={() => navigator.clipboard?.writeText(joinUrl)}><Copy size={18} /> Copy Join Link</button>
          <button onClick={() => store.createRoom(String(Math.floor(1000 + Math.random() * 9000)))}>Create Room</button>
          <button onClick={() => store.updateRoom({ status: "join", current_scene: 1, current_beat: 0, joins_allowed: true })}>Show Join Screen</button>
          <button onClick={() => store.updateRoom({ status: "live", current_scene: 2, current_beat: 0, joins_allowed: false })}>ابدأ الرحلة</button>
          <button onClick={() => store.updateRoom({ joins_allowed: !store.room.joins_allowed })}><Lock size={18} /> {store.room.joins_allowed ? "Lock Late Joins" : "Allow Late Joins"}</button>
        </div>
        <div className="control-panel">
          <h2>Story</h2>
          <p>{scene?.title} — Beat {store.room.current_beat + 1}/{scene?.beats.length}</p>
          <div className="button-row">
            <button onClick={() => go("previous")}>Previous</button>
            <button onClick={() => go("next")}>Next</button>
          </div>
          <select
            value={store.room.current_scene}
            onChange={(event) => {
              const sceneIndex = Number(event.target.value);
              store.updateRoom(applyPosition(store.room, { sceneIndex, beatIndex: 0 }, scenes[sceneIndex].interaction?.id ?? null));
            }}
          >
            {scenes.map((item, index) => <option value={index} key={item.id}>{index + 1}. {item.title}</option>)}
          </select>
          <button onClick={() => store.updateRoom({ muted: !store.room.muted })}>{store.room.muted ? "Unmute" : "Mute"}</button>
          <button onClick={() => store.updateRoom({ ...makeRoom(store.room.code), current_scene: 0, status: "draft" })}><RotateCcw size={18} /> Restart</button>
        </div>
        <div className="control-panel">
          <h2>Voting</h2>
          <p>{interaction ? interaction.question : "No active question"}</p>
          <button disabled={!interaction} onClick={() => store.updateRoom({ voting_open: !store.room.voting_open })}>{store.room.voting_open ? "Close Voting" : "Open Voting"}</button>
          <button disabled={!interaction} onClick={() => store.updateRoom({ answer_revealed: true })}>Reveal Answer</button>
          <button disabled={!interaction} onClick={() => store.updateRoom({ results_visible: !store.room.results_visible })}>{store.room.results_visible ? "Hide Results" : "Show Results"}</button>
          <div className="button-row">
            <button disabled={!interaction} onClick={() => store.updateRoom({ names_visible: "hidden" })}><EyeOff size={18} /> Hide Names</button>
            <button disabled={!interaction} onClick={() => store.updateRoom({ names_visible: "sample" })}><Eye size={18} /> Sample</button>
            <button disabled={!interaction} onClick={() => store.updateRoom({ names_visible: "all" })}><Users size={18} /> All</button>
          </div>
          <button disabled={!interaction} onClick={() => store.resetVotes(interaction?.id)}>Reset Current Votes</button>
        </div>
        <div className="control-panel">
          <h2>Participants ({store.participants.length})</h2>
          <label className="search"><Search size={18} /><input value={query} onChange={(event) => setQuery(event.target.value)} placeholder="Search participants" /></label>
          <div className="participant-list">
            {filtered.map((participant) => <span key={participant.session_id}>● {participant.display_name}</span>)}
          </div>
        </div>
      </section>
      <footer>Production security: connect Supabase Auth/RLS before live use. Local mode is for rehearsal.</footer>
    </main>
  );
}
