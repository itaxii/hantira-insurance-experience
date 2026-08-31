import { motion } from "framer-motion";
import type { CharacterAnimation, CharacterExpression } from "../../types";

type Props = {
  name: "hantira" | "faheem";
  expression?: CharacterExpression;
  animation?: CharacterAnimation;
  facing?: "left" | "right";
  className?: string;
};

/* Single source of truth for both characters.
   Same head size, proportions, stroke width and face style for every scene. */

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

function bodyMotion(animation: CharacterAnimation) {
  switch (animation) {
    case "walk":
      return { y: [0, -7, 0], rotate: [0, 1.4, 0], transition: { repeat: Infinity, duration: 1.5, ease: "easeInOut" as const } };
    case "run":
      return { y: [0, -11, 0], rotate: [0, 4, 0], transition: { repeat: Infinity, duration: 0.62, ease: "easeInOut" as const } };
    case "panic":
      return { rotate: [-2.4, 2.4, -2.4], x: [-3, 3, -3], transition: { repeat: Infinity, duration: 0.26 } };
    case "fall":
      return { rotate: -16, y: 26, transition: { type: "spring" as const, stiffness: 90, damping: 12 } };
    case "celebrate":
      return { y: [0, -12, 0], transition: { repeat: Infinity, duration: 1.1, ease: "easeInOut" as const } };
    case "idle":
      return { y: [0, -3, 0], transition: { repeat: Infinity, duration: 2.6, ease: "easeInOut" as const } };
    default:
      return {};
  }
}

function armPaths(animation: CharacterAnimation): { right: string; left: string } {
  switch (animation) {
    case "wave":
      return { right: "M98 112 Q132 82 124 48", left: "M84 112 Q58 136 44 166" };
    case "point":
      return { right: "M98 112 L150 96", left: "M84 112 Q58 136 44 166" };
    case "think":
      return { right: "M98 112 Q122 136 136 166", left: "M84 112 Q64 92 80 64" };
    case "facepalm":
      return { right: "M98 112 Q108 72 88 52", left: "M84 112 Q58 136 44 166" };
    case "celebrate":
      return { right: "M98 112 Q124 88 122 46", left: "M84 112 Q58 88 60 46" };
    case "panic":
      return { right: "M98 112 Q128 94 138 60", left: "M84 112 Q54 94 44 60" };
    case "run":
      return { right: "M98 112 Q126 108 142 128", left: "M84 112 Q56 116 40 134" };
    default:
      return { right: "M98 112 Q122 136 136 166", left: "M84 112 Q58 136 44 166" };
  }
}

export function StickCharacter({ name, expression = "neutral", animation = "idle", facing = "right", className }: Props) {
  const isFaheem = name === "faheem";
  const scaleX = facing === "left" ? -1 : 1;
  const eyeOffset = animation === "look-left" ? -4 : animation === "look-right" ? 4 : 0;
  const browTilt = expression === "angry" || expression === "suspicious" ? 8 : expression === "confused" ? -6 : 0;
  const arms = armPaths(animation);
  const lidDroop = expression === "relieved" || expression === "suspicious";

  return (
    <span className={`character-wrap ${className ?? ""}`} style={{ transform: `scaleX(${scaleX})`, display: "block" }}>
      <motion.svg
        viewBox="0 0 180 260"
        role="img"
        aria-label={isFaheem ? "فهيم، وسيط التأمين" : "حنتيرة"}
        animate={bodyMotion(animation)}
        style={{ overflow: "visible", width: "100%", height: "auto", display: "block" }}
      >
        <g fill="none" stroke="currentColor" strokeWidth="7" strokeLinecap="round" strokeLinejoin="round">
          <circle cx="90" cy="54" r="36" fill="var(--paper)" />
          <path d="M90 92 L90 158" />
          <path d={arms.left} />
          <path d={arms.right} />
          <path d="M90 158 L54 230" />
          <path d="M90 158 L126 230" />
          {isFaheem && <path d="M74 100 L106 100 L98 152 L82 152 Z" fill="var(--accent)" strokeWidth="4" opacity="0.9" />}
        </g>
        <g fill="none" stroke="currentColor" strokeWidth="4" strokeLinecap="round">
          <path d={`M62 ${42 + browTilt} L78 ${38 - browTilt}`} />
          <path d={`M102 ${38 - browTilt} L118 ${42 + browTilt}`} />
        </g>
        <g fill="currentColor">
          <circle cx={76 + eyeOffset} cy="50" r="4" />
          <circle cx={104 + eyeOffset} cy="50" r="4" />
          {lidDroop && (
            <g stroke="var(--paper)" strokeWidth="5">
              <path d={`M72 ${47 + eyeOffset * 0.5} H80`} />
              <path d={`M100 ${47 + eyeOffset * 0.5} H108`} />
            </g>
          )}
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
    </span>
  );
}

export function Hantira(props: Omit<Props, "name">) {
  return <StickCharacter {...props} name="hantira" />;
}

export function Faheem(props: Omit<Props, "name">) {
  return <StickCharacter {...props} name="faheem" />;
}
