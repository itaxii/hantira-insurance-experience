import { AnimatePresence, motion } from "framer-motion";
import { QRCodeSVG } from "qrcode.react";
import { useEffect, useMemo, useState } from "react";
import { appConfig } from "../config";
import { Faheem, Hantira } from "../components/characters/StickCharacter";
import { BrokerSlider, BusinessAssets, OfferCards, SimpleFlow, TermCloud } from "../components/LineAssets";
import { ResultsView } from "../components/ResultsView";
import { soundManager } from "../components/SoundManager";
import { scenes } from "../data/scenes";
import { getActiveBeat, getActiveScene, moveBeat } from "../lib/story";
import { applyPosition } from "../lib/roomState";
import { useExperienceStore } from "../lib/experienceStore";
import { joinUrl } from "../lib/routing";

export function PresentRoute() {
  const store = useExperienceStore();
  const [started, setStarted] = useState(false);
  const position = { sceneIndex: store.room.current_scene, beatIndex: store.room.current_beat };
  const scene = getActiveScene(scenes, position);
  const beat = getActiveBeat(scenes, position);
  const interaction = scene.interaction;
  const roomUrl = joinUrl(window.location.origin, store.room.code);
  const sceneVotes = interaction ? store.votes.filter((vote) => vote.question_id === interaction.id) : [];

  const setPosition = (next: typeof position) => {
    const nextScene = getActiveScene(scenes, next);
    store.updateRoom(applyPosition(store.room, next, nextScene.interaction?.id ?? null));
  };

  useEffect(() => {
    const handler = (event: KeyboardEvent) => {
      if (event.key === "ArrowRight" || event.key === " ") setPosition(moveBeat(scenes, position, "next"));
      if (event.key === "ArrowLeft") setPosition(moveBeat(scenes, position, "previous"));
      if (event.key.toLowerCase() === "r") store.updateRoom({ answer_revealed: true, results_visible: true });
      if (event.key.toLowerCase() === "v" && interaction) store.updateRoom({ voting_open: !store.room.voting_open });
      if (event.key.toLowerCase() === "m") {
        soundManager.setMuted(!store.room.muted);
        store.updateRoom({ muted: !store.room.muted });
      }
      if (event.key.toLowerCase() === "f") document.documentElement.requestFullscreen?.().catch(() => undefined);
      if (event.key === "Escape" && document.fullscreenElement) document.exitFullscreen?.();
    };
    window.addEventListener("keydown", handler);
    return () => window.removeEventListener("keydown", handler);
  }, [position.sceneIndex, position.beatIndex, store.room, interaction]);

  const progress = useMemo(() => Math.round(((position.sceneIndex + 1) / scenes.length) * 100), [position.sceneIndex]);

  if (!started) {
    return (
      <main className="presentation start-screen">
        <div>
          <p className="eyebrow">Interactive Storytelling</p>
          <h1>{appConfig.title}</h1>
          <p>اضغط Start Experience لبدء العرض وتفعيل الصوت أو Fullscreen لو المتصفح سمح.</p>
          <button
            className="primary"
            onClick={() => {
              setStarted(true);
              soundManager.unlock().catch(() => undefined);
              document.documentElement.requestFullscreen?.().catch(() => undefined);
            }}
          >
            Start Experience
          </button>
        </div>
      </main>
    );
  }

  return (
    <main className={`presentation visual-${beat?.visual ?? "plain"} ${beat?.effects?.includes("shake") ? "shake" : ""}`}>
      <div className="top-strip">
        <span>{scene.title}</span>
        <span>{store.participants.length} مشارك</span>
      </div>
      <div className="progress"><span style={{ width: `${progress}%` }} /></div>
      <AnimatePresence mode="wait">
        <motion.section
          key={`${scene.id}-${beat?.id}`}
          className="stage"
          initial={{ opacity: 0, y: 24, scale: 0.98 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={{ opacity: 0, y: -24, scale: 0.98 }}
          transition={{ type: "spring", stiffness: 120, damping: 20 }}
        >
          <div className="stage-copy">
            {beat?.kicker && <p className="kicker">{beat.kicker}</p>}
            {beat?.headline && <h1>{beat.headline}</h1>}
            {beat?.body && <p className="body-copy">{beat.body}</p>}
            {beat?.dialogue && <p className="dialogue">{beat.dialogue}</p>}
            {interaction && (
              <div className="interaction-panel">
                <h2>{interaction.question}</h2>
                <p>{store.room.voting_open ? "التصويت مفتوح" : "التصويت مقفول"} • النتائج تظهر بقرار المقدم</p>
                {store.room.results_visible && <ResultsView interaction={interaction} votes={sceneVotes} namesVisible={store.room.names_visible} />}
                {store.room.answer_revealed && interaction.explanation && <p className="explanation">{interaction.explanation}</p>}
              </div>
            )}
          </div>
          <div className="stage-visual">
            {scene.onceOnlyQr ? (
              <div className="qr-wrap">
                <QRCodeSVG value={roomUrl} size={260} bgColor="#f8f5ef" fgColor="#171717" />
                <strong>Room: {store.room.code}</strong>
                <span>● {store.participants.length} مشارك</span>
              </div>
            ) : beat?.visual?.includes("assets") || beat?.visual?.includes("business") || beat?.visual?.includes("logistics") ? (
              <BusinessAssets variant={beat.visual} />
            ) : beat?.visual === "three-offers" ? (
              <OfferCards />
            ) : beat?.visual === "term-cloud" ? (
              <TermCloud />
            ) : beat?.visual === "broker-slider" ? (
              <BrokerSlider />
            ) : beat?.body?.includes("→") ? (
              <SimpleFlow text={beat.body} />
            ) : (
              <div className="scene-object">{beat?.visual ?? "story"}</div>
            )}
            <div className="characters">
              {beat?.hantira && <Hantira className="character" {...beat.hantira} />}
              {beat?.faheem && <Faheem className="character faheem" {...beat.faheem} />}
            </div>
          </div>
        </motion.section>
      </AnimatePresence>
    </main>
  );
}
