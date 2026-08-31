import { motion } from "framer-motion";
import { useEffect, useMemo, useState } from "react";
import { Hantira } from "../components/characters/StickCharacter";
import { CheckMark } from "../components/visuals/primitives";
import { scenes } from "../data/scenes";
import { useExperienceStore } from "../lib/experienceStore";
import { nicknameErrorMessage, sanitizeNickname } from "../lib/nickname";
import { createParticipantSessionId, loadStoredSession, rememberVote, saveStoredSession, selectedVotesFor, type StoredSession } from "../lib/session";
import { canJoinRoom } from "../lib/roomState";
import { getBeatInteraction } from "../lib/story";
import { isCorrectSelection } from "../lib/votes";
import type { CharacterAnimation, CharacterExpression } from "../types";

const waiting: Array<{ text: string; expression: CharacterExpression; animation: CharacterAnimation }> = [
  { text: "إنت دلوقتي مع حنتيرة.", expression: "happy", animation: "wave" },
  { text: "استنى السؤال الجاي...", expression: "thinking", animation: "idle" },
  { text: "حنتيرة لسه بيقرر.", expression: "suspicious", animation: "think" },
  { text: "خليك جاهز... حنتيرة غالبًا هيعمل مصيبة تانية.", expression: "shocked", animation: "panic" },
  { text: "فهيم بيحاول يلحق الموقف.", expression: "neutral", animation: "walk" }
];

export function JoinRoute({ roomCode }: { roomCode: string }) {
  const store = useExperienceStore(roomCode);
  const [name, setName] = useState("");
  const [error, setError] = useState("");
  const [session, setSession] = useState<StoredSession | null>(() => loadStoredSession(roomCode));
  const [draftSelected, setDraftSelected] = useState<string[]>([]);
  const [submittedInteraction, setSubmittedInteraction] = useState<string | null>(null);
  const scene = scenes[store.room.current_scene];
  const beat = scene?.beats[store.room.current_beat];
  const interaction = getBeatInteraction(scene, beat?.id);
  const votes = interaction ? selectedVotesFor(store.votes, session?.participantSessionId ?? "", interaction.id) : [];
  const selected = votes.length ? votes : draftSelected;
  const waitingState = waiting[(store.room.current_scene + store.room.current_beat) % waiting.length];

  useEffect(() => {
    if (session) store.join(session.nickname, session.participantSessionId);
  }, [session?.participantSessionId]);

  useEffect(() => {
    setDraftSelected([]);
    setSubmittedInteraction(null);
  }, [interaction?.id]);

  const selectedLabels = useMemo(
    () => selected.map((id) => interaction?.options.find((option) => option.id === id)?.label ?? id),
    [selected, interaction]
  );

  if (store.room.code !== roomCode) {
    return (
      <MobileShell status="offline" nickname="">
        <Hantira className="mobile-hantira" expression="confused" animation="look-left" />
        <h1>الغرفة غير موجودة</h1>
        <p className="privacy">راجع رقم الغرفة مع المقدم.</p>
      </MobileShell>
    );
  }

  if (!session) {
    return (
      <MobileShell status="offline" nickname="">
        <Hantira className="mobile-hantira" expression="happy" animation="wave" />
        <h1>أهلاً بيك في رحلة حنتيرة</h1>
        <p className="privacy">اختار اسم يظهر بيه تصويتك</p>
        <input value={name} onChange={(event) => setName(event.target.value)} placeholder="مثال: محمد / Mo / Batman / أبو حنتيرة" maxLength={32} />
        {error && <p className="error">{error}</p>}
        <p className="privacy">الاسم اللي تختاره ممكن يظهر على شاشة العرض، فاختار اسم مناسب للعرض.</p>
        <button
          className="primary"
          onClick={() => {
            const clean = sanitizeNickname(name);
            if (!clean.ok) {
              setError(nicknameErrorMessage(clean.error));
              return;
            }
            if (!canJoinRoom(store.room)) {
              setError("الانضمام مقفول دلوقتي. كلم المقدم لو محتاج تدخل.");
              return;
            }
            const next = { participantSessionId: createParticipantSessionId(), roomCode, nickname: clean.value, votes: {} };
            saveStoredSession(next);
            setSession(next);
          }}
        >
          ادخل الرحلة
        </button>
      </MobileShell>
    );
  }

  if (!interaction) {
    return (
      <MobileShell status="online" nickname={session.nickname}>
        <Hantira className="mobile-hantira" expression={waitingState.expression} animation={waitingState.animation} />
        <h1>تمام يا {session.nickname}</h1>
        <p className="privacy">{waitingState.text}</p>
        <p className="personal-choice">متنساش تبص على الشاشة الكبيرة — الحتة الجاية جاية.</p>
      </MobileShell>
    );
  }

  const locked = votes.length > 0 && !interaction.allowChange;
  const revealed = store.room.answer_revealed;
  const correctness = revealed ? isCorrectSelection(interaction, selected) : null;
  const hasRecordedVote = votes.length > 0 || Boolean(session.votes[interaction.id]?.length);
  const showSubmitConfirmation = hasRecordedVote || submittedInteraction === interaction.id;

  return (
    <MobileShell status="online" nickname={session.nickname}>
      <p className="eyebrow">{store.room.voting_open ? "التصويت مفتوح" : "التصويت مقفول"}</p>
      <h1>{interaction.question}</h1>
      {interaction.type === "multi" && <p className="privacy">اختار كل الحاجات اللي تشوفها مناسبة.</p>}
      <div className="vote-options">
        {interaction.options.map((option) => {
          const active = selected.includes(option.id);
          return (
            <button
              key={option.id}
              className={active ? "selected" : ""}
              disabled={!store.room.voting_open || locked}
              onClick={() => {
                if (interaction.type === "multi") {
                  setDraftSelected(active ? selected.filter((id) => id !== option.id) : [...selected, option.id]);
                } else {
                  setDraftSelected([option.id]);
                }
              }}
            >
              <span className="check-slot">{active && <CheckMark size={22} />}</span>
              {option.label}
            </button>
          );
        })}
      </div>
      {selected.length > 0 && <p className="personal-choice">اختيارك: {selectedLabels.join("، ")}</p>}
      {showSubmitConfirmation && (
        <p className="success">
          {interaction.type === "multi" ? "تم تسجيل اختياراتك ✅" : `تم تسجيل اختيارك يا ${session.nickname} ✅`}
        </p>
      )}
      {store.room.voting_open && !locked && (
        <button
          className="primary"
          disabled={selected.length === 0}
          onClick={async () => {
            const ok = await Promise.resolve(store.submitVote(interaction.id, session.participantSessionId, selected, interaction.allowChange));
            if (ok) {
              setSession(rememberVote(session, interaction.id, selected));
              setSubmittedInteraction(interaction.id);
            }
          }}
        >
          {interaction.type === "multi" && selected.length > 1 ? `سجل اختياري (${selected.length})` : "سجل اختياري"}
        </button>
      )}
      {locked && <p className="success">تم تسجيل اختيارك يا {session.nickname}. التصويت مقفول للتغيير.</p>}
      {interaction.allowChange && store.room.voting_open && <p className="privacy">تقدر تغيّر اختيارك لحد ما التصويت يقفل.</p>}
      {revealed && selected.length > 0 && (
        <motion.div className={`result-card ${correctness === false ? "wrong" : "right"}`} initial={{ scale: 0.96 }} animate={{ scale: 1 }}>
          {correctness === null ? (
            <p>اختيارك اتسجل وشوفنا رأي المجموعة.</p>
          ) : correctness ? (
            <p>عاش يا {session.nickname}. اختيارك كان صح.</p>
          ) : (
            <p>
              المرة دي حنتيرة ضحك عليك 😄
              <br />
              اختيارك كان: {selectedLabels.join("، ")}
              <br />
              الإجابة الأفضل:{" "}
              {interaction.options
                .filter((option) => option.id === interaction.correctAnswer)
                .map((option) => option.label)
                .join("، ")}
            </p>
          )}
        </motion.div>
      )}
    </MobileShell>
  );
}

function MobileShell({ children, status, nickname }: { children: React.ReactNode; status: "online" | "offline"; nickname: string }) {
  return (
    <main className="audience">
      <header className={status}>
        <span className={`status-dot ${status}`} aria-hidden="true" />
        {nickname || "Guest"}
      </header>
      <section>{children}</section>
    </main>
  );
}
