import { motion } from "framer-motion";
import type { CharacterAnimation, CharacterExpression } from "../../types";

type Props = {
  name: "hantira" | "faheem";
  expression?: CharacterExpression;
  animation?: CharacterAnimation;
  facing?: "left" | "right";
  className?: string;
};

const mouthPath: Record<CharacterExpression, string> = {
  neutral: "M74 56 Q90 60 106 56",
  happy: "M72 55 Q90 72 108 55",
  confused: "M76 62 Q90 54 104 62",
  shocked: "M86 58 Q90 70 94 58 Q90 52 86 58",
  worried: "M74 66 Q90 54 106 66",
  proud: "M72 56 Q90 68 108 56",
  suspicious: "M78 60 L104 58",
  thinking: "M78 61 Q90 58 102 61",
  angry: "M75 65 Q90 52 105 65",
  relieved: "M75 58 Q90 68 105 58"
};

function animationFor(animation: CharacterAnimation) {
  if (animation === "walk") return { x: [0, 10, 0], transition: { repeat: Infinity, duration: 1.8 } };
  if (animation === "run") return { x: [0, 18, 0], transition: { repeat: Infinity, duration: 0.9 } };
  if (animation === "panic") return { rotate: [-2, 2, -2], x: [-3, 3, -3], transition: { repeat: Infinity, duration: 0.25 } };
  if (animation === "fall") return { rotate: -18, y: 22 };
  if (animation === "celebrate") return { y: [0, -10, 0], transition: { repeat: Infinity, duration: 1.2 } };
  return {};
}

export function StickCharacter({ name, expression = "neutral", animation = "idle", facing = "right", className }: Props) {
  const isFaheem = name === "faheem";
  const scaleX = facing === "left" ? -1 : 1;
  const eyeOffset = animation === "look-left" ? -3 : animation === "look-right" ? 3 : 0;
  const browTilt = expression === "angry" || expression === "suspicious" ? 8 : expression === "confused" ? -6 : 0;
  const armRight =
    animation === "wave"
      ? "M98 112 Q132 82 124 48"
      : animation === "point"
        ? "M98 112 L148 94"
        : animation === "facepalm"
          ? "M96 110 Q104 74 86 52"
          : "M96 112 Q122 136 136 166";
  const armLeft = animation === "think" ? "M84 112 Q66 92 78 62" : "M84 112 Q58 136 44 166";

  return (
    <motion.svg
      viewBox="0 0 180 260"
      className={className}
      style={{ transform: `scaleX(${scaleX})` }}
      role="img"
      aria-label={isFaheem ? "فهيم، وسيط التأمين" : "حنتيرة"}
      animate={animationFor(animation)}
    >
      <g fill="none" stroke="currentColor" strokeWidth="7" strokeLinecap="round" strokeLinejoin="round">
        <circle cx="90" cy="54" r="36" fill="var(--paper)" />
        <path d="M90 92 L90 158" />
        <path d={armLeft} />
        <path d={armRight} />
        <path d="M90 158 L54 230" />
        <path d="M90 158 L126 230" />
        {isFaheem && <path d="M74 100 L106 100 L98 150 L82 150 Z" fill="var(--accent-soft)" strokeWidth="4" />}
      </g>
      <g fill="none" stroke="currentColor" strokeWidth="4" strokeLinecap="round">
        <path d={`M62 ${42 + browTilt} L78 ${38 - browTilt}`} />
        <path d={`M102 ${38 - browTilt} L118 ${42 + browTilt}`} />
      </g>
      <g fill="currentColor">
        <circle cx={76 + eyeOffset} cy="50" r="4" />
        <circle cx={104 + eyeOffset} cy="50" r="4" />
      </g>
      {isFaheem && (
        <g fill="none" stroke="currentColor" strokeWidth="3">
          <circle cx="76" cy="50" r="10" />
          <circle cx="104" cy="50" r="10" />
          <path d="M86 50 L94 50" />
        </g>
      )}
      <path d={mouthPath[expression]} fill="none" stroke="currentColor" strokeWidth="4" strokeLinecap="round" />
    </motion.svg>
  );
}

export function Hantira(props: Omit<Props, "name">) {
  return <StickCharacter {...props} name="hantira" />;
}

export function Faheem(props: Omit<Props, "name">) {
  return <StickCharacter {...props} name="faheem" />;
}
