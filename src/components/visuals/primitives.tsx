import type { CSSProperties } from "react";

export type GroupProps = { transform?: string; className?: string; style?: CSSProperties };

const S = 6;

function gProps({ transform, className, style }: GroupProps) {
  return { transform, className, style };
}

export function OfficeBuilding(p: GroupProps) {
  return (
    <g {...gProps(p)} fill="none" stroke="currentColor" strokeWidth={S} strokeLinecap="round" strokeLinejoin="round">
      <path d="M0 120 V0 H90 V120" />
      <path d="M-12 120 H102" />
      <path d="M18 26 H36 M54 26 H72 M18 56 H36 M54 56 H72 M18 86 H36 M54 86 H72" strokeWidth={4} />
    </g>
  );
}

export function CarSide(p: GroupProps & { broken?: boolean }) {
  const { broken, ...rest } = p;
  return (
    <g {...gProps(rest)} fill="none" stroke="currentColor" strokeWidth={S} strokeLinecap="round" strokeLinejoin="round">
      <path d="M0 66 H12 M170 66 H182" />
      <path d="M14 66 V44 Q14 38 22 38 H52 L72 16 Q75 12 82 12 H126 Q132 12 136 18 L152 38 H168 Q174 38 174 44 V66" />
      <path d="M80 16 V38 M108 16 V38 M74 38 H144" strokeWidth={4} />
      <circle cx="46" cy="70" r="16" />
      <circle cx="46" cy="70" r="5" strokeWidth={4} />
      <circle cx="140" cy="70" r="16" />
      <circle cx="140" cy="70" r="5" strokeWidth={4} />
      {broken ? (
        <>
          <path d="M52 38 L74 16" strokeWidth={4} strokeDasharray="6 8" />
          <path d="M22 34 L34 24 M18 44 L34 40" strokeWidth={4} />
        </>
      ) : (
        <path d="M150 56 H166" strokeWidth={4} />
      )}
    </g>
  );
}

export function TruckSide(p: GroupProps) {
  return (
    <g {...gProps(p)} fill="none" stroke="currentColor" strokeWidth={S} strokeLinecap="round" strokeLinejoin="round">
      <path d="M0 74 V14 H96 V74" />
      <path d="M96 30 H126 L146 52 V74 H96" />
      <path d="M-10 74 H156" />
      <circle cx="30" cy="78" r="14" />
      <circle cx="118" cy="78" r="14" />
      <path d="M12 32 H56 M12 50 H72" strokeWidth={4} />
    </g>
  );
}

export function Warehouse(p: GroupProps) {
  return (
    <g {...gProps(p)} fill="none" stroke="currentColor" strokeWidth={S} strokeLinecap="round" strokeLinejoin="round">
      <path d="M0 110 V34 L70 6 L140 34 V110" />
      <path d="M-12 110 H152" />
      <path d="M44 110 V64 H96 V110" />
      <path d="M50 78 H90 M50 94 H90" strokeWidth={4} />
    </g>
  );
}

export function Crate(p: GroupProps) {
  return (
    <g {...gProps(p)} fill="none" stroke="currentColor" strokeWidth={S} strokeLinecap="round" strokeLinejoin="round">
      <rect x="0" y="0" width="64" height="64" rx="6" />
      <path d="M0 22 H64 M32 22 V64" strokeWidth={4} />
    </g>
  );
}

export function PersonIcon(p: GroupProps) {
  return (
    <g {...gProps(p)} fill="none" stroke="currentColor" strokeWidth={S} strokeLinecap="round" strokeLinejoin="round">
      <circle cx="0" cy="-26" r="14" />
      <path d="M0 -10 V30 M-22 6 L0 -2 L22 6 M0 30 L-16 58 M0 30 L16 58" />
    </g>
  );
}

export function Flame(p: GroupProps & { size?: number }) {
  const { size = 1, ...rest } = p;
  return (
    <g {...gProps(rest)} fill="none" stroke="currentColor" strokeWidth={S} strokeLinecap="round" strokeLinejoin="round">
      <path
        d="M0 -70 Q22 -44 26 -18 Q30 6 12 16 Q22 -2 6 -18 Q14 4 -6 18 Q-26 6 -20 -18 Q-16 -36 0 -70 Z"
        transform={`scale(${size})`}
        className="flame"
        style={{ transformOrigin: "0 18px" }}
      />
      <path
        d="M0 -30 Q10 -14 8 -2 Q6 8 -2 10 Q4 0 -4 -8 Q-8 2 -8 8 Q-12 0 -8 -10 Q-5 -18 0 -30 Z"
        transform={`scale(${size})`}
        className="flame flame--inner"
        style={{ transformOrigin: "0 10px" }}
      />
    </g>
  );
}

export function ShieldShape(p: GroupProps) {
  return (
    <g {...gProps(p)} fill="none" stroke="currentColor" strokeWidth={S} strokeLinecap="round" strokeLinejoin="round">
      <path d="M0 -90 C40 -74 66 -70 86 -70 C86 6 52 62 0 92 C-52 62 -86 6 -86 -70 C-66 -70 -40 -74 0 -90 Z" />
      <path d="M-30 -2 L-8 22 L34 -30" strokeWidth={7} className="draw-path" />
    </g>
  );
}

export function DocSheet(p: GroupProps & { lines?: number }) {
  const { lines = 3, ...rest } = p;
  const rows = Array.from({ length: lines }, (_, index) => 34 + index * 18);
  return (
    <g {...gProps(rest)} fill="none" stroke="currentColor" strokeWidth={S} strokeLinecap="round" strokeLinejoin="round">
      <path d="M0 0 H62 L84 22 V120 H0 Z" />
      <path d="M62 0 V22 H84" strokeWidth={4} />
      {rows.map((y) => (
        <path key={y} d={`M14 ${y} H${y % 36 === 34 ? 58 : 70}`} strokeWidth={4} />
      ))}
    </g>
  );
}

export function SunCloud(p: GroupProps) {
  return (
    <g {...gProps(p)} fill="none" stroke="currentColor" strokeWidth={S} strokeLinecap="round" strokeLinejoin="round">
      <circle cx="0" cy="0" r="26" />
      <path d="M0 -40 V-52 M0 40 V52 M-40 0 H-52 M40 0 H52 M-28 -28 L-37 -37 M28 28 L37 37 M-28 28 L-37 37 M28 -28 L37 -37" strokeWidth={4} />
    </g>
  );
}

export function Cloud(p: GroupProps) {
  return (
    <g {...gProps(p)} fill="none" stroke="currentColor" strokeWidth={S} strokeLinecap="round" strokeLinejoin="round">
      <path d="M-30 18 Q-48 18 -48 4 Q-48 -10 -32 -10 Q-30 -26 -12 -26 Q4 -26 8 -12 Q26 -14 26 2 Q26 18 8 18 Z" strokeWidth={4} />
    </g>
  );
}

export function ShipSide(p: GroupProps) {
  return (
    <g {...gProps(p)} fill="none" stroke="currentColor" strokeWidth={S} strokeLinecap="round" strokeLinejoin="round">
      <path d="M-70 26 H70 L54 52 H-52 Z" />
      <path d="M-40 26 V-10 H24 V26 M-40 2 H24 M-8 -10 V2" strokeWidth={4} />
      <path d="M-78 62 Q-60 54 -42 62 T-6 62 T30 62 T66 62" strokeWidth={4} className="wave-line" />
    </g>
  );
}

export function PhoneIcon(p: GroupProps) {
  return (
    <g {...gProps(p)} fill="none" stroke="currentColor" strokeWidth={S} strokeLinecap="round" strokeLinejoin="round">
      <rect x="-24" y="-42" width="48" height="84" rx="10" />
      <path d="M-10 28 H10" strokeWidth={4} />
      <path d="M-12 -20 Q0 -32 12 -20 M-6 -8 Q0 -14 6 -8" strokeWidth={4} />
      <circle cx="0" cy="4" r="3" fill="currentColor" stroke="none" />
    </g>
  );
}

export function MailIcon(p: GroupProps) {
  return (
    <g {...gProps(p)} fill="none" stroke="currentColor" strokeWidth={S} strokeLinecap="round" strokeLinejoin="round">
      <rect x="-36" y="-24" width="72" height="48" rx="6" />
      <path d="M-36 -18 L0 8 L36 -18" strokeWidth={4} />
    </g>
  );
}

export function CrackStar(p: GroupProps & { r?: number }) {
  const { r = 40, ...rest } = p;
  const spokes = Array.from({ length: 8 }, (_, index) => {
    const angle = (index * Math.PI) / 4;
    const inner = r * 0.32;
    const outer = index % 2 === 0 ? r : r * 0.66;
    return `M${(Math.cos(angle) * inner).toFixed(1)} ${(Math.sin(angle) * inner).toFixed(1)} L${(Math.cos(angle) * outer).toFixed(1)} ${(Math.sin(angle) * outer).toFixed(1)}`;
  });
  return (
    <g {...gProps(rest)} fill="none" stroke="currentColor" strokeWidth={S} strokeLinecap="round">
      {spokes.map((d, index) => (
        <path key={index} d={d} />
      ))}
      <circle r={r * 0.16} fill="currentColor" stroke="none" />
    </g>
  );
}

export function SmokePuff(p: GroupProps & { delay?: number }) {
  const { delay = 0, ...rest } = p;
  return (
    <g {...gProps(rest)} className="smoke-puff" style={{ animationDelay: `${delay}s` }}>
      <circle cx="0" cy="0" r="16" fill="none" stroke="currentColor" strokeWidth={5} />
      <circle cx="18" cy="-14" r="11" fill="none" stroke="currentColor" strokeWidth={5} />
    </g>
  );
}

export function ArrowLeft(p: GroupProps & { length?: number }) {
  const { length = 70, ...rest } = p;
  return (
    <g {...gProps(rest)} fill="none" stroke="currentColor" strokeWidth={S} strokeLinecap="round" strokeLinejoin="round">
      <path d={`M${length / 2} 0 H-${length / 2}`} className="flow-arrow" />
      <path d={`M-${length / 2 - 12} -12 L-${length / 2} 0 L-${length / 2 - 12} 12`} className="flow-arrow" />
    </g>
  );
}

export function PauseDots(p: GroupProps) {
  return (
    <g {...gProps(p)} fill="currentColor" stroke="none">
      <circle cx="-34" cy="0" r="7" className="pause-dot" />
      <circle cx="0" cy="0" r="7" className="pause-dot" style={{ animationDelay: "160ms" }} />
      <circle cx="34" cy="0" r="7" className="pause-dot" style={{ animationDelay: "320ms" }} />
    </g>
  );
}

export function CheckMark({ className, size = 20 }: { className?: string; size?: number }) {
  return (
    <svg viewBox="0 0 24 24" width={size} height={size} className={className} aria-hidden="true">
      <path
        d="M4 12.5 L9.5 18 L20 6.5"
        fill="none"
        stroke="currentColor"
        strokeWidth="3.4"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}
