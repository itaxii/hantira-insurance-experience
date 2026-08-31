import { AnimatePresence, motion, MotionConfig } from "framer-motion";
import { QRCodeSVG } from "qrcode.react";
import { useEffect, useMemo, useState } from "react";
import { appConfig } from "../config";
import { Faheem, Hantira } from "../components/characters/StickCharacter";
import { SceneVisual } from "../components/visuals/SceneVisual";
import { ResultsView } from "../components/ResultsView";
import { soundManager } from "../components/SoundManager";
import { scenes } from "../data/scenes";
import { getActiveBeat, getActiveScene, getBeatInteraction, moveBeat } from "../lib/story";
import { applyPosition } from "../lib/roomState";
import { useExperienceStore } from "../lib/experienceStore";
import { joinUrl } from "../lib/routing";
import { useActiveRoomCode } from "../lib/activeRoom";

const CENTER_VISUALS = new Set([
  "dark",
  "dark-center",
  "quiet",
  "final-question",
  "logo",
  "peek",
  "remove-words",
  "broker-value",
  "broker-value-setup",
  "impact",
  "formula",
  "contact-reveal",
  "contact-stats",
  "contact-serves",
  "contact-flow",
  "creator-credit"
]);
const SPEAKER_LABEL = { hantira: "حنتيرة", faheem: "فهيم" } as const;
const OPTION_LETTERS = ["A", "B", "C", "D", "E", "F"];

function classSafe(value: string | undefined) {
  return value ? value.replace(/[^a-zA-Z0-9_-]/g, "-") : "plain";
}

const effectCues: Record<string, string> = {
  footsteps: "step",
  "car-engine": "engine",
  crash: "crash",
  shake: "crash",
  alarm: "alarm",
  "invoice-reveal": "thud",
  "paper-drop": "paper"
};

export function PresentRoute() {
  const [roomCode] = useActiveRoomCode();
  const store = useExperienceStore(roomCode);
  const [started, setStarted] = useState(false);
  const position = { sceneIndex: store.room.current_scene, beatIndex: store.room.current_beat };
  const scene = getActiveScene(scenes, position);
  const beat = getActiveBeat(scenes, position);
  const interaction = getBeatInteraction(scene, beat?.id);
  const roomUrl = joinUrl(window.location.origin, store.room.code);
  const sceneVotes = interaction ? store.votes.filter((vote) => vote.question_id === interaction.id) : [];

  const setPosition = (next: typeof position) => {
    const nextScene = getActiveScene(scenes, next);
    const nextBeat = getActiveBeat(scenes, next);
    store.updateRoom(applyPosition(store.room, next, getBeatInteraction(nextScene, nextBeat?.id)?.id ?? null));
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

  useEffect(() => {
    soundManager.setMuted(store.room.muted);
  }, [store.room.muted]);

  useEffect(() => {
    beat?.effects?.forEach((effect) => {
      const cue = effectCues[effect];
      if (cue) soundManager.play(cue);
    });
  }, [beat?.id]);

  const progress = useMemo(() => Math.round(((position.sceneIndex + 1) / scenes.length) * 100), [position.sceneIndex]);

  if (!started) {
    return (
      <main className="presentation start-screen">
        <div>
          <p className="eyebrow">Interactive Storytelling</p>
          <h1>{appConfig.title}</h1>
          <p className="start-note">اضغط Start Experience لبدء العرض وتفعيل الصوت أو Fullscreen لو المتصفح سمح.</p>
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
          <p className="hint-strip">→ / Space: التالي &nbsp;·&nbsp; ←: السابق &nbsp;·&nbsp; V: تصويت &nbsp;·&nbsp; R: كشف &nbsp;·&nbsp; M: صمت &nbsp;·&nbsp; F: ملء الشاشة</p>
        </div>
      </main>
    );
  }

  const visual = beat?.visual;
  const hasVisual = Boolean(visual);
  const isCenter = !hasVisual || CENTER_VISUALS.has(visual ?? "");
  const moodClass = beat?.mood === "dark" ? " mood-dark" : "";
  const shakeClass = beat?.effects?.includes("shake") ? " shake" : "";
  const resultOnlyInteraction = Boolean(beat?.id && scene.interactionResultOnlyBeatIds?.includes(beat.id));
  const stageClass = ["stage", isCenter ? "stage--center" : "", scene.kind === "interaction" && hasVisual ? "stage--ask" : ""].filter(Boolean).join(" ");

  return (
    <MotionConfig reducedMotion="user">
      <main className={`presentation scene-${classSafe(scene.id)} beat-${classSafe(beat?.id)} visual-${visual ?? "plain"}${moodClass}${shakeClass}`}>
        <div className="top-strip">
          <span>{scene.title}</span>
          <span>{store.participants.length} مشارك</span>
        </div>
        <div className="progress"><span style={{ width: `${progress}%` }} /></div>
        <AnimatePresence mode="wait">
          <motion.section
            key={`${scene.id}-${beat?.id}`}
            className={stageClass}
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -18 }}
            transition={{ duration: 0.34, ease: [0.22, 0.61, 0.21, 1] }}
          >
            <div className="stage-copy">
              {beat?.kicker && <p className="kicker">{beat.kicker}</p>}
              {beat?.headline && <h1>{beat.headline}</h1>}
              {beat?.body && <p className="body-copy">{beat.body}</p>}
              {beat?.dialogue && (
                <div className="dialogue-bubble">
                  <span className="dialogue-speaker">{SPEAKER_LABEL[beat.speaker ?? "hantira"]}</span>
                  <p>{beat.dialogue}</p>
                </div>
              )}
              {interaction && (!resultOnlyInteraction || store.room.results_visible || (store.room.answer_revealed && interaction.explanation)) && (
                <div className={`interaction-panel${resultOnlyInteraction ? " interaction-panel--result-only" : ""}`}>
                  {!resultOnlyInteraction && <h2>{interaction.question}</h2>}
                  {!resultOnlyInteraction && (
                    <p className="vote-status">
                      {store.room.voting_open ? "التصويت مفتوح — شاركوا من الموبايل" : "التصويت مقفول"} • النتائج تظهر بقرار المقدم
                    </p>
                  )}
                  {!resultOnlyInteraction && !store.room.results_visible && (
                    <div className={`interaction-options count-${interaction.options.length}`}>
                      {interaction.options.map((option, index) => (
                        <span className="interaction-option" key={option.id}>
                          <span className={`option-letter${interaction.type === "multi" ? " option-letter--multi" : ""}`}>
                            {interaction.type === "multi" ? index + 1 : OPTION_LETTERS[index]}
                          </span>
                          {option.label}
                        </span>
                      ))}
                    </div>
                  )}
                  {store.room.results_visible && <ResultsView interaction={interaction} votes={sceneVotes} namesVisible={store.room.names_visible} />}
                  {store.room.answer_revealed && interaction.explanation && <p className="explanation">{interaction.explanation}</p>}
                </div>
              )}
            </div>
            {hasVisual && (
              <div className="stage-visual">
                {scene.onceOnlyQr ? (
                  <div className="qr-wrap">
                    <QRCodeSVG value={roomUrl} size={260} bgColor="#fffdf7" fgColor="#1a1915" />
                    <strong>Room: {store.room.code}</strong>
                    <span>{store.participants.length} مشارك معانا</span>
                    <p className="qr-hint">امسح مرة واحدة — وهتفضل معانا لحد نهاية الرحلة.</p>
                  </div>
                ) : (
                  <SceneVisual id={visual ?? ""} />
                )}
                <div className="characters">
                  {beat?.hantira && <Hantira className="character" {...beat.hantira} />}
                  {beat?.faheem && <Faheem className="character faheem" {...beat.faheem} />}
                </div>
              </div>
            )}
          </motion.section>
        </AnimatePresence>
        <p className="hint-strip">→ / Space: التالي · ←: السابق · V: تصويت · R: كشف النتائج · M: صمت</p>
      </main>
    </MotionConfig>
  );
}
