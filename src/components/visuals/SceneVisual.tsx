import { useState } from "react";
import { appConfig } from "../../config";
import {
  ArrowLeft,
  CarSide,
  Cloud,
  CrackStar,
  Crate,
  DocSheet,
  Flame,
  MailIcon,
  OfficeBuilding,
  PauseDots,
  PersonIcon,
  PhoneIcon,
  ShipSide,
  ShieldShape,
  SmokePuff,
  SunCloud,
  TruckSide,
  Warehouse
} from "./primitives";
import { useCountUp } from "./useCountUp";

type VisualProps = { id: string };

function delay(index: number, step = 90): React.CSSProperties {
  return { animationDelay: `${index * step}ms` };
}

function publicAsset(path: string) {
  return `${import.meta.env.BASE_URL}${path.replace(/^\/+/, "")}`;
}

/* ---------------------------------- opening --------------------------------- */

function OpeningSpotlight() {
  return (
    <svg viewBox="0 0 900 520" className="scene-art" aria-hidden="true">
      <ellipse cx="450" cy="280" rx="330" ry="200" fill="currentColor" opacity="0.05" />
      <ellipse cx="450" cy="280" rx="220" ry="135" fill="currentColor" opacity="0.05" />
      <path d="M120 470 H780" stroke="currentColor" strokeWidth="5" strokeLinecap="round" opacity="0.35" />
      {[0, 1, 2, 3, 4].map((step) => (
        <g key={step} className="footstep" style={delay(step, 420)} opacity="0">
          <ellipse cx={250 + step * 90} cy={430 - (step % 2) * 16} rx="16" ry="8" fill="currentColor" />
        </g>
      ))}
    </svg>
  );
}

function CenterSpotlight() {
  return (
    <svg viewBox="0 0 900 520" className="scene-art" aria-hidden="true">
      <ellipse cx="450" cy="300" rx="300" ry="185" fill="currentColor" opacity="0.06" />
      <ellipse cx="450" cy="300" rx="190" ry="115" fill="currentColor" opacity="0.07" />
      <path d="M180 460 H720" stroke="currentColor" strokeWidth="5" strokeLinecap="round" opacity="0.3" />
    </svg>
  );
}

/* ------------------------------- meet hantira ------------------------------- */

function AssetStat({ children, label, index }: { children: React.ReactNode; label: string; index: number }) {
  return (
    <figure className="asset-stat rise" style={delay(index)}>
      <svg viewBox="-70 -70 140 200" aria-hidden="true">{children}</svg>
      <figcaption>{label}</figcaption>
    </figure>
  );
}

function BusinessLineup() {
  return (
    <div className="asset-lineup">
      <AssetStat label="مكتب" index={0}>
        <g transform="translate(-45,-30) scale(1)">
          <OfficeBuilding />
        </g>
      </AssetStat>
      <AssetStat label="عربيات" index={1}>
        <g transform="translate(-60,-20) scale(0.72)">
          <TruckSide />
        </g>
      </AssetStat>
      <AssetStat label="موظفين" index={2}>
        <g transform="translate(-22,58)">
          <PersonIcon />
        </g>
      </AssetStat>
      <AssetStat label="مخزن" index={3}>
        <g transform="translate(-62,48) scale(0.9)">
          <Warehouse />
        </g>
      </AssetStat>
      <AssetStat label="بضاعة" index={4}>
        <g transform="translate(-52,44) scale(0.8)">
          <Crate />
          <g transform="translate(74,0)">
            <Crate />
          </g>
          <g transform="translate(37,-66)">
            <Crate />
          </g>
        </g>
      </AssetStat>
    </div>
  );
}

function BusinessCore() {
  return (
    <div className="asset-lineup asset-lineup--core">
      <AssetStat label="مكتب" index={0}>
        <g transform="translate(-45,-30)">
          <OfficeBuilding />
        </g>
      </AssetStat>
      <AssetStat label="عربية" index={1}>
        <g transform="translate(-62,-16) scale(0.7)">
          <CarSide />
        </g>
      </AssetStat>
      <AssetStat label="مخزن" index={2}>
        <g transform="translate(-62,48) scale(0.9)">
          <Warehouse />
        </g>
      </AssetStat>
    </div>
  );
}

function ProtectedBusiness() {
  return (
    <div className="shield-wrap">
      <svg viewBox="0 0 900 460" className="scene-art" aria-hidden="true">
        <g transform="translate(150,300) scale(0.75)">
          <OfficeBuilding />
        </g>
        <g transform="translate(360,335) scale(0.62)">
          <TruckSide />
        </g>
        <g transform="translate(600,250) scale(0.85)">
          <Warehouse />
        </g>
        <g className="draw-path" style={{ strokeDasharray: 620, strokeDashoffset: 620 }}>
          <path
            d="M450 30 C560 66 640 72 700 72 C700 240 610 330 450 420 C290 330 200 240 200 72 C260 72 340 66 450 30 Z"
            fill="none"
            stroke="var(--accent)"
            strokeWidth="9"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </g>
        <g transform="translate(450,180)" stroke="var(--accent)" strokeWidth="9" fill="none" strokeLinecap="round" strokeLinejoin="round" className="rise" style={delay(6)}>
          <path d="M-34 6 L-8 34 L40 -26" />
        </g>
      </svg>
    </div>
  );
}

/* -------------------------------- the morning ------------------------------- */

function SunnyRoad() {
  return (
    <svg viewBox="0 0 900 520" className="scene-art" aria-hidden="true">
      <g transform="translate(760,110)" className="rise">
        <SunCloud />
      </g>
      <g transform="translate(180,120)" className="drift">
        <Cloud />
      </g>
      <g transform="translate(560,90)" className="drift drift--slow">
        <Cloud />
      </g>
      <path d="M0 330 Q220 300 450 316 T900 306" fill="none" stroke="currentColor" strokeWidth="4" opacity="0.35" />
      <path d="M0 370 H900" stroke="currentColor" strokeWidth="4" opacity="0.35" />
      <path d="M120 420 H260 M340 436 H470 M540 420 H690 M760 436 H880" className="dash-road" stroke="currentColor" strokeWidth="7" strokeLinecap="round" />
    </svg>
  );
}

function DrivingScene() {
  return (
    <svg viewBox="0 0 900 520" className="scene-art" aria-hidden="true">
      <path d="M60 400 H840" stroke="currentColor" strokeWidth="4" opacity="0.25" />
      {[0, 1, 2].map((line) => (
        <path
          key={line}
          d={`M${90 + line * 40} ${180 + line * 60} h60 M${560 + line * 60} ${150 + line * 70} h50`}
          className="speed-line"
          stroke="currentColor"
          strokeWidth="6"
          strokeLinecap="round"
          style={delay(line, 140)}
        />
      ))}
      <g transform="translate(230,300) scale(1.9)">
        <g className="car-bob">
          <CarSide />
          <g transform="translate(96,26)">
            <circle cx="0" cy="0" r="12" fill="var(--paper)" stroke="currentColor" strokeWidth="5" />
            <circle cx="-3" cy="-2" r="1.8" fill="currentColor" />
            <circle cx="4" cy="-2" r="1.8" fill="currentColor" />
          </g>
        </g>
      </g>
      <path d="M100 470 H320 M420 470 H560 M660 470 H820" className="dash-road" stroke="currentColor" strokeWidth="7" strokeLinecap="round" />
    </svg>
  );
}

function CrashScene() {
  return (
    <svg viewBox="0 0 900 520" className="scene-art" aria-hidden="true">
      <path d="M40 452 H860" stroke="currentColor" strokeWidth="5" opacity="0.3" />
      <g transform="translate(520,330)">
        <g className="crack-pop" style={{ color: "var(--danger)" }}>
          <CrackStar r={92} />
        </g>
      </g>
      <g transform="translate(120,300) scale(1.8) rotate(-9)" className="car-tilt">
        <CarSide broken />
      </g>
      <g transform="translate(660,430) rotate(24)" className="wheel-roll">
        <circle r="30" fill="none" stroke="currentColor" strokeWidth="7" />
        <circle r="8" fill="currentColor" />
      </g>
      <SmokePuff transform="translate(300,250)" delay={0.1} />
      <SmokePuff transform="translate(360,200)" delay={0.5} />
      <SmokePuff transform="translate(430,240)" delay={0.9} />
    </svg>
  );
}

function InvoiceVisual() {
  const amount = useCountUp(appConfig.examples.crashInvoice);
  return (
    <div className="invoice-card" style={{ color: "var(--ink)" }}>
      <svg viewBox="0 0 360 460" className="invoice-art" aria-hidden="true">
        <g transform="translate(24,26)">
          <path d="M0 0 H260 L312 52 V408 H0 Z" fill="var(--card)" stroke="currentColor" strokeWidth="6" strokeLinejoin="round" />
          <path d="M260 0 V52 H312" fill="none" stroke="currentColor" strokeWidth="6" strokeLinejoin="round" />
          <text x="26" y="56" fontSize="30" fontWeight="800" fill="currentColor" stroke="none" letterSpacing="4">INVOICE</text>
          <path d="M26 92 H286" stroke="currentColor" strokeWidth="4" strokeDasharray="10 10" />
          {[136, 168, 200].map((y) => (
            <path key={y} d={`M26 ${y} H${y === 200 ? 150 : 230}`} stroke="currentColor" strokeWidth="5" strokeLinecap="round" />
          ))}
          <g transform="translate(26,300)" className="stamp-tilt">
            <rect x="0" y="0" width="180" height="56" rx="10" fill="none" stroke="var(--danger)" strokeWidth="6" />
            <text x="16" y="38" fontSize="24" fontWeight="800" fill="var(--danger)" stroke="none">مستحقة بالكامل</text>
          </g>
        </g>
      </svg>
      <div className="invoice-amount" dir="ltr">
        {amount.toLocaleString("en-US")}
        <span> EGP</span>
      </div>
    </div>
  );
}

/* ------------------------------- risk & impact ------------------------------ */

function BrokenCar() {
  return (
    <svg viewBox="0 0 900 520" className="scene-art" aria-hidden="true">
      <g transform="translate(210,290) scale(1.9)">
        <CarSide broken />
      </g>
      <SmokePuff transform="translate(430,220)" delay={0} />
      <SmokePuff transform="translate(500,190)" delay={0.7} />
      <path d="M120 440 H780" stroke="currentColor" strokeWidth="5" strokeLinecap="round" opacity="0.3" />
    </svg>
  );
}

const impactTiers = [
  { label: "خسارة صغيرة", value: "10K", icon: "crack", height: 26, tone: "var(--muted)" },
  { label: "خسارة متوسطة", value: "100K", icon: "car", height: 52, tone: "var(--gold)" },
  { label: "خسارة كبيرة", value: "1M", icon: "fire", height: 80, tone: "var(--danger)" }
];

function ImpactColumn({ tier, index }: { tier: (typeof impactTiers)[number]; index: number }) {
  return (
    <div className="impact-col">
      <div className="impact-bar-track">
        <span className="impact-bar bar-grow" style={{ height: `${tier.height}%`, background: tier.tone, ...delay(index, 200) }} />
      </div>
      <svg viewBox="-44 -44 88 88" className="impact-icon" style={{ color: tier.tone }} aria-hidden="true">
        {tier.icon === "crack" && <g transform="scale(0.9)"><CrackStar r={34} /></g>}
        {tier.icon === "car" && <g transform="translate(-38,-6) scale(0.36)"><CarSide broken /></g>}
        {tier.icon === "fire" && <g transform="translate(0,26) scale(0.55)"><Flame /></g>}
      </svg>
      <strong style={delay(index, 200)}>{tier.value}</strong>
      <span style={delay(index, 200)}>{tier.label}</span>
    </div>
  );
}

function ImpactVisual() {
  return (
    <div className="impact-board rise">
      <div className="impact-grid">
        {impactTiers.map((tier, index) => (
          <ImpactColumn key={tier.value} tier={tier} index={index} />
        ))}
      </div>
      <p className="impact-caption">كل ما الـ Impact يزيد... الخسارة المالية تزيد أضعاف.</p>
    </div>
  );
}

function RiskFormula() {
  const needleSwing = true;
  return (
    <div className="risk-formula">
      <div className="risk-factor card-quiet rise">
        <h3>Probability</h3>
        <p>احتمالية الحدوث</p>
        <div className="prob-rows">
          {[
            { dots: 1, label: "منخفضة" },
            { dots: 2, label: "متوسطة" },
            { dots: 3, label: "عالية" }
          ].map((row, index) => (
            <div className="prob-row" key={row.label} style={delay(index, 160)}>
              <span className="prob-dots" aria-hidden="true">
                {[0, 1, 2].map((dot) => (
                  <i key={dot} className={dot < row.dots ? "on" : ""} />
                ))}
              </span>
              <span className="prob-label">{row.label}</span>
            </div>
          ))}
        </div>
      </div>
      <span className="risk-op rise" style={delay(1, 160)}>×</span>
      <div className="risk-factor card-quiet rise" style={delay(2, 160)}>
        <h3>Impact</h3>
        <p>حجم الخسارة</p>
        <div className="impact-minis">
          {[30, 60, 92].map((width, index) => (
            <span className="impact-mini" key={width}>
              <i style={{ width: `${width}%`, ...delay(index, 160) }} />
            </span>
          ))}
        </div>
        <p className="impact-mini-labels" dir="ltr">10K → 100K → 1M</p>
      </div>
      <span className="risk-op rise" style={delay(3, 160)}>=</span>
      <div className="risk-gauge rise" style={delay(4, 160)}>
        <svg viewBox="0 0 200 130" aria-hidden="true">
          <path d="M20 120 A80 80 0 0 1 180 120" fill="none" stroke="var(--line)" strokeWidth="14" strokeLinecap="round" />
          <path d="M20 120 A80 80 0 0 1 180 120" fill="none" stroke="var(--accent)" strokeWidth="14" strokeLinecap="round" strokeDasharray="252" strokeDashoffset="150" className="draw-in" />
          <g className={needleSwing ? "needle-swing" : ""} style={{ transformOrigin: "100px 120px" }}>
            <path d="M100 120 L150 62" stroke="currentColor" strokeWidth="8" strokeLinecap="round" fill="none" />
          </g>
          <circle cx="100" cy="120" r="10" fill="currentColor" />
        </svg>
        <h3>Risk</h3>
      </div>
    </div>
  );
}

/* --------------------------- insurance in 30 sec ---------------------------- */

type FlowNode = { label: string; sub?: string; icon: React.ReactNode; tone?: string };

function flowNodeIcon(kind: string, tone?: string) {
  const color = tone ?? "currentColor";
  switch (kind) {
    case "crack":
      return <g transform="translate(0,4)"><CrackStar r={30} /></g>;
    case "person":
      return <g transform="translate(0,34) scale(0.72)"><PersonIcon /></g>;
    case "loss":
      return (
        <g>
          <g transform="translate(-20,0) scale(0.5)"><CrackStar r={26} /></g>
          <path d="M12 -14 H44 V22 H12 Z" fill="none" stroke={color} strokeWidth="6" strokeLinejoin="round" transform="translate(0,2)" />
          <path d="M18 4 H38" stroke={color} strokeWidth="5" strokeLinecap="round" />
        </g>
      );
    case "coin":
      return (
        <g fill="none" stroke={color} strokeWidth="6" strokeLinecap="round">
          <circle cx="0" cy="0" r="24" />
          <path d="M-10 -8 H10 M-10 2 H10 M0 -16 V16" strokeWidth="5" />
        </g>
      );
    case "insurer":
      return (
        <g transform="translate(0,4) scale(0.62)">
          <ShieldShape />
        </g>
      );
    case "policy":
      return (
        <g transform="translate(-16,-20) scale(0.55)">
          <DocSheet lines={3} />
          <path d="M14 84 L26 96 L48 66" fill="none" stroke="var(--accent)" strokeWidth="8" strokeLinecap="round" strokeLinejoin="round" />
        </g>
      );
    default:
      return null;
  }
}

function FlowVisual({ nodes, tone }: { nodes: FlowNode[]; tone?: string }) {
  return (
    <div className="flow-diagram" style={{ color: tone ?? "currentColor" }}>
      {nodes.map((node, index) => (
        <div className="flow-item" key={node.label}>
          {index > 0 && (
            <svg className="flow-sep rise" style={delay(index, 260)} viewBox="-36 -18 72 36" aria-hidden="true">
              <ArrowLeft length={56} />
            </svg>
          )}
          <div className="flow-card card-quiet rise" style={delay(index, 260)}>
            <svg viewBox="-52 -52 104 104" aria-hidden="true">
              {flowNodeIcon(node.icon as string, node.tone)}
            </svg>
            <strong>{node.label}</strong>
            {node.sub && <span>{node.sub}</span>}
          </div>
        </div>
      ))}
    </div>
  );
}

/* ------------------------------ insurance market ---------------------------- */

const companies = ["A", "B", "C", "D", "E", "F"];

function MarketRow() {
  return (
    <div className="market-row">
      {companies.map((letter, index) => (
        <figure className="company pop" style={delay(index, 120)} key={letter}>
          <svg viewBox="-60 -86 120 160" aria-hidden="true">
            <path d="M-46 40 V-20 L0 -44 L46 -20 V40" fill="none" stroke="currentColor" strokeWidth="6" strokeLinejoin="round" />
            <path d="M-56 40 H56" stroke="currentColor" strokeWidth="6" strokeLinecap="round" />
            <path d="M-22 0 H22 M-22 18 H22" stroke="currentColor" strokeWidth="4" strokeLinecap="round" />
            <path d="M0 -44 V-70 H30 L22 -62 L30 -54 H0" fill="none" stroke="currentColor" strokeWidth="5" strokeLinejoin="round" />
          </svg>
          <figcaption>Company {letter}</figcaption>
        </figure>
      ))}
    </div>
  );
}

const stormDocs = ["عرض سعر", "شروط", "استثناءات", "جداول", "ملاحق", "Premium", "Deductible", "Limits"];
const stormPositions = [
  { x: 50, y: 8 },
  { x: 78, y: 22 },
  { x: 84, y: 52 },
  { x: 66, y: 78 },
  { x: 34, y: 80 },
  { x: 14, y: 58 },
  { x: 18, y: 26 },
  { x: 48, y: 46 }
];

function OfferStorm() {
  return (
    <div className="offer-storm" aria-hidden="true">
      <span className="storm-core" />
      {stormDocs.map((label, index) => {
        const position = stormPositions[index];
        return (
          <span className="storm-doc pop" key={label} style={{ ...delay(index, 120), "--x": `${position.x}%`, "--y": `${position.y}%` } as React.CSSProperties}>
            {label}
          </span>
        );
      })}
    </div>
  );
}

function PaperPile() {
  return (
    <svg viewBox="0 0 900 520" className="scene-art" aria-hidden="true">
      {[
        { x: 300, y: 420, r: -4, label: "عرض C" },
        { x: 340, y: 372, r: 6, label: "عرض A" },
        { x: 316, y: 326, r: -7, label: "عرض F" },
        { x: 356, y: 282, r: 3, label: "عرض B" },
        { x: 322, y: 238, r: -3, label: "عرض E" }
      ].map((paper, index) => (
        <g key={paper.label} transform={`translate(${paper.x},${paper.y}) rotate(${paper.r})`} className="rise" style={delay(index, 180)}>
          <rect x="0" y="0" width="220" height="46" rx="8" fill="var(--card)" stroke="currentColor" strokeWidth="5" />
          <text x="18" y="31" fontSize="22" fontWeight="700" fill="currentColor" stroke="none">{paper.label}</text>
          <path d="M120 23 H200" stroke="currentColor" strokeWidth="4" strokeLinecap="round" />
        </g>
      ))}
      {[0, 1].map((drop) => (
        <g key={drop} className="paper-drop" style={{ animationDelay: `${drop * 0.9}s` }} transform={`translate(${520 + drop * 60},${120 + drop * 30}) rotate(${drop ? 10 : -8})`}>
          <rect width="200" height="42" rx="8" fill="var(--card)" stroke="currentColor" strokeWidth="5" />
          <path d="M110 21 H180" stroke="currentColor" strokeWidth="4" strokeLinecap="round" />
        </g>
      ))}
      <path d="M140 470 H780" stroke="currentColor" strokeWidth="5" strokeLinecap="round" opacity="0.3" />
    </svg>
  );
}

/* --------------------------------- offers ----------------------------------- */

const offerData = [
  { id: "A", premium: "20K", deductible: "100K", coverage: "تغطية محدودة", extras: "استثناءات كتير", tone: "cheap" },
  { id: "B", premium: "27K", deductible: "25K", coverage: "تغطية أفضل", extras: "دعم Claims كويس", tone: "fit" },
  { id: "C", premium: "35K", deductible: "10K", coverage: "تغطية أوسع", extras: "مزايا إضافية", tone: "premium" }
];

export function OfferPanels({ detail = false }: { detail?: boolean }) {
  return (
    <div className={`offer-panels${detail ? " offer-panels--detail" : ""}`}>
      {offerData.map((offer, index) => (
        <article className={`offer-panel tone-${offer.tone} pop`} style={delay(index, 160)} key={offer.id}>
          <header>
            <span className="offer-letter">{offer.id}</span>
            {offer.tone === "cheap" && !detail && <span className="offer-tag">الأرخص</span>}
            {offer.tone === "fit" && detail && <span className="offer-tag offer-tag--fit">Right Fit</span>}
          </header>
          <p className="offer-premium" dir="ltr">
            Premium <strong>{offer.premium}</strong>
          </p>
          {detail && (
            <ul className="offer-rows">
              <li>
                Deductible <strong dir="ltr">{offer.deductible}</strong>
              </li>
              <li>{offer.coverage}</li>
              <li>{offer.extras}</li>
            </ul>
          )}
        </article>
      ))}
    </div>
  );
}

/* ------------------------------- term cloud --------------------------------- */

const terms = ["Premium", "Deductible", "Limits", "Exclusions", "Conditions", "Claims", "Add-ons", "Coverage"];
const termPositions = [
  { x: 8, y: 10 },
  { x: 42, y: 4 },
  { x: 70, y: 18 },
  { x: 6, y: 42 },
  { x: 46, y: 36 },
  { x: 72, y: 54 },
  { x: 18, y: 74 },
  { x: 52, y: 76 }
];

export function TermCloud({ mode = "chaos" }: { mode?: "chaos" | "tight" | "frozen" }) {
  return (
    <div className={`term-cloud term-cloud--${mode}`} aria-hidden="true">
      {terms.map((term, index) => {
        const position = termPositions[index];
        return (
          <span key={term} style={{ ...delay(index, 110), "--x": `${position.x}%`, "--y": `${position.y}%` } as React.CSSProperties}>
            {term}
          </span>
        );
      })}
    </div>
  );
}

/* --------------------------------- broker ----------------------------------- */

function DoorEntry() {
  return (
    <svg viewBox="0 0 900 520" className="scene-art" aria-hidden="true">
      <path d="M300 470 H600" stroke="currentColor" strokeWidth="5" strokeLinecap="round" opacity="0.3" />
      <path d="M360 470 V120 Q360 96 384 96 H516 Q540 96 540 120 V470" fill="none" stroke="currentColor" strokeWidth="7" strokeLinejoin="round" />
      <g className="door-open" style={{ transformOrigin: "540px 283px" }}>
        <path d="M540 120 V470 L620 440 V150 Z" fill="none" stroke="currentColor" strokeWidth="6" strokeLinejoin="round" opacity="0.7" />
      </g>
      <g stroke="var(--accent)" strokeWidth="5" strokeLinecap="round" opacity="0.55" className="rise">
        <path d="M340 200 L180 150 M340 260 L150 260 M340 320 L180 370" style={delay(2, 200)} />
      </g>
      <circle cx="588" cy="290" r="7" fill="currentColor" />
    </svg>
  );
}

const brokerSteps = [
  "Client",
  "Understand Needs",
  "Identify Risks",
  "Design Coverage",
  "Approach Market",
  "Compare Offers",
  "Negotiate",
  "Recommend",
  "Arrange Coverage",
  "Manage Policies",
  "Support Claims",
  "Renew & Improve"
];

export function BrokerJourney({ from = 0, to = 6 }: { from?: number; to?: number }) {
  const steps = brokerSteps.slice(from, to);
  return (
    <ol className="journey-grid">
      {steps.map((step, index) => (
        <li className="journey-step card-quiet rise" style={delay(index, 130)} key={step}>
          <span className="journey-index">{from + index + 1}</span>
          <span>{step}</span>
        </li>
      ))}
    </ol>
  );
}

/* -------------------------------- logistics --------------------------------- */

function LogisticsVisual() {
  const stats = [
    { value: "30", label: "Trucks", icon: <g transform="translate(-58,-8) scale(0.6)"><TruckSide /></g> },
    { value: "1", label: "Warehouse", icon: <g transform="translate(-58,30) scale(0.85)"><Warehouse /></g> },
    { value: "120", label: "Employees", icon: <g transform="translate(0,34) scale(0.62)"><PersonIcon /></g> },
    { value: "Intl", label: "Shipments", icon: <g transform="translate(0,-6) scale(0.55)"><ShipSide /></g> }
  ];
  return (
    <div className="logistics-grid">
      {stats.map((stat, index) => (
        <div className="logistics-stat card-quiet rise" style={delay(index, 140)} key={stat.label}>
          <svg viewBox="-70 -60 140 130" aria-hidden="true">{stat.icon}</svg>
          <strong dir="ltr">{stat.value}</strong>
          <span>{stat.label}</span>
        </div>
      ))}
    </div>
  );
}

const shieldSegments = ["Motor", "Property", "Medical", "Marine Cargo", "Liability", "Fire"];

function ShieldBuild() {
  return (
    <div className="shield-build">
      <svg viewBox="0 0 520 460" className="scene-art" aria-hidden="true">
        <g transform="translate(260,230)">
          <path
            d="M0 -190 C86 -156 142 -150 186 -150 C186 26 114 134 0 200 C-114 134 -186 26 -186 -150 C-142 -150 -86 -156 0 -190 Z"
            fill="none"
            stroke="var(--accent)"
            strokeWidth="9"
            strokeLinejoin="round"
            strokeDasharray="1100"
            className="draw-path"
          />
          {shieldSegments.map((segment, index) => {
            const angle = -90 + index * 60;
            const rad = (angle * Math.PI) / 180;
            const x = Math.cos(rad) * 128;
            const y = Math.sin(rad) * 128;
            return (
              <g key={segment} transform={`translate(${x.toFixed(0)},${y.toFixed(0)})`} className="pop" style={delay(index, 220)}>
                <circle r="42" fill="var(--card)" stroke="var(--accent)" strokeWidth="5" opacity="0.92" />
                <text x="0" y="7" textAnchor="middle" fontSize="17" fontWeight="800" fill="var(--accent-ink)" stroke="none">
                  {segment}
                </text>
              </g>
            );
          })}
          <text x="0" y="10" textAnchor="middle" fontSize="26" fontWeight="900" fill="currentColor" stroke="none">
            Hantira Logistics
          </text>
        </g>
      </svg>
    </div>
  );
}

function ProtectionVoteVisual() {
  return (
    <div className="protection-vote">
      {[
        ["Vehicles", "Motor"],
        ["Warehouse", "Property"],
        ["Employees", "Medical"],
        ["Cargo", "Marine"],
        ["Business", "Liability"],
        ["Fire", "Property extension"]
      ].map(([asset, coverage], index) => (
        <article className="protection-choice card-quiet rise" style={delay(index, 120)} key={asset}>
          <span>{asset}</span>
          <strong>{coverage}</strong>
        </article>
      ))}
    </div>
  );
}

function ProtectionMapVisual() {
  const mappings = [
    { from: "Vehicles", to: "Motor Fleet", x1: 160, y1: 110, x2: 640, y2: 110 },
    { from: "Warehouse", to: "Property", x1: 160, y1: 210, x2: 640, y2: 190 },
    { from: "Employees", to: "Medical", x1: 160, y1: 310, x2: 640, y2: 270 },
    { from: "Cargo", to: "Marine Cargo", x1: 160, y1: 410, x2: 640, y2: 350 }
  ];
  return (
    <svg viewBox="0 0 820 470" className="scene-art protection-map" aria-hidden="true">
      {mappings.map((item, index) => (
        <g key={item.from} className="rise" style={delay(index, 160)}>
          <rect x={item.x1 - 110} y={item.y1 - 28} width="220" height="56" rx="10" fill="var(--card)" stroke="currentColor" strokeWidth="4" />
          <text x={item.x1} y={item.y1 + 7} textAnchor="middle" fontSize="20" fontWeight="800" fill="currentColor" stroke="none">{item.from}</text>
          <path d={`M${item.x1 + 120} ${item.y1} C${item.x1 + 250} ${item.y1} ${item.x2 - 250} ${item.y2} ${item.x2 - 120} ${item.y2}`} fill="none" stroke="var(--accent)" strokeWidth="5" strokeLinecap="round" className="draw-in" />
          <rect x={item.x2 - 120} y={item.y2 - 30} width="240" height="60" rx="10" fill="var(--accent-soft)" stroke="var(--accent)" strokeWidth="4" />
          <text x={item.x2} y={item.y2 + 7} textAnchor="middle" fontSize="20" fontWeight="850" fill="var(--accent-ink)" stroke="none">{item.to}</text>
        </g>
      ))}
      <g transform="translate(410,230)" className="pop" style={delay(5, 160)}>
        <path d="M0 -70 C36 -56 62 -54 86 -54 C86 20 50 58 0 88 C-50 58 -86 20 -86 -54 C-62 -54 -36 -56 0 -70 Z" fill="var(--card-solid)" stroke="var(--accent)" strokeWidth="6" />
        <text x="0" y="12" textAnchor="middle" fontSize="18" fontWeight="900" fill="var(--accent-ink)" stroke="none">Risk Profile</text>
      </g>
    </svg>
  );
}

function ShieldAroundAssets() {
  return (
    <div className="shield-wrap">
      <svg viewBox="0 0 900 460" className="scene-art" aria-hidden="true">
        <g transform="translate(170,300) scale(0.7)">
          <OfficeBuilding />
        </g>
        <g transform="translate(350,340) scale(0.6)">
          <TruckSide />
        </g>
        <g transform="translate(600,250) scale(0.85)">
          <Warehouse />
        </g>
        <g transform="translate(560,380) scale(0.5)">
          <Crate />
          <g transform="translate(70,0)">
            <Crate />
          </g>
        </g>
        <path
          d="M450 24 C560 60 646 66 706 66 C706 238 612 332 450 424 C288 332 194 238 194 66 C254 66 340 60 450 24 Z"
          fill="none"
          stroke="var(--accent)"
          strokeWidth="9"
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeDasharray="1100"
          className="draw-path"
        />
        {[280, 450, 620].map((x, index) => (
          <g key={x} transform={`translate(${x},${index === 1 ? 120 : 140})`} className="pop" style={delay(index + 3, 260)}>
            <circle r="24" fill="var(--card)" stroke="var(--accent)" strokeWidth="5" />
            <path d="M-10 2 L-2 12 L14 -10" fill="none" stroke="var(--accent)" strokeWidth="6" strokeLinecap="round" strokeLinejoin="round" />
          </g>
        ))}
      </svg>
    </div>
  );
}

/* ------------------------------- six months --------------------------------- */

function QuietWarehouse() {
  return (
    <svg viewBox="0 0 900 520" className="scene-art" aria-hidden="true">
      <circle cx="760" cy="100" r="34" fill="none" stroke="currentColor" strokeWidth="5" opacity="0.7" />
      <path d="M744 84 A34 34 0 0 0 744 116 A26 26 0 0 1 744 84" fill="currentColor" opacity="0.7" />
      {[
        [180, 90],
        [420, 60],
        [620, 130]
      ].map(([x, y], index) => (
        <circle key={index} cx={x} cy={y} r="3.5" fill="currentColor" className="twinkle" style={delay(index, 400)} />
      ))}
      <g transform="translate(280,250) scale(1.5)" opacity="0.9">
        <Warehouse />
      </g>
      <path d="M120 470 H780" stroke="currentColor" strokeWidth="5" strokeLinecap="round" opacity="0.35" />
      <g transform="translate(450,440)" opacity="0.5">
        <PauseDots />
      </g>
    </svg>
  );
}

function WarehouseFire() {
  return (
    <svg viewBox="0 0 900 520" className="scene-art" aria-hidden="true">
      <g transform="translate(280,260) scale(1.5)">
        <Warehouse />
      </g>
      <g transform="translate(520,120)" className="pop" style={{ color: "var(--danger)" }}>
        <Flame size={1.15} />
      </g>
      <g transform="translate(600,180) scale(0.8)" className="pop" style={{ color: "var(--gold)", ...delay(1, 180) }}>
        <Flame size={0.9} />
      </g>
      <g transform="translate(452,96)" className="pop" style={delay(2, 180)}>
        <path d="M-16 0 H16 M0 -16 V16" stroke="var(--danger)" strokeWidth="8" strokeLinecap="round" />
      </g>
      <g transform="translate(452,70)">
        <path d="M-40 0 A40 40 0 0 1 40 0" fill="none" stroke="var(--danger)" strokeWidth="6" strokeLinecap="round" className="beacon" opacity="0.6" />
      </g>
      <SmokePuff transform="translate(700,140)" delay={0} />
      <SmokePuff transform="translate(750,100)" delay={0.8} />
      <path d="M120 470 H780" stroke="currentColor" strokeWidth="5" strokeLinecap="round" opacity="0.35" />
    </svg>
  );
}

/* --------------------------------- claims ----------------------------------- */

function ClaimFormVisual() {
  return (
    <div className="claim-visual">
      <div className="claim-doc pop">
        <svg viewBox="-24 -30 132 180" aria-hidden="true">
          <g transform="translate(0,6)">
            <DocSheet lines={4} />
          </g>
          <text x="14" y="16" fontSize="15" fontWeight="800" fill="currentColor" stroke="none">
            CLAIM FORM
          </text>
        </svg>
      </div>
      <div className="claim-phone pop" style={delay(1, 220)}>
        <svg viewBox="-40 -60 80 120" aria-hidden="true">
          <PhoneIcon />
        </svg>
        <span className="claim-badge">الإبلاغ أولاً</span>
      </div>
    </div>
  );
}

const claimSteps = ["Incident", "Notification", "Documentation", "Survey / Assessment", "Insurer Review", "Settlement per Policy"];

export function ClaimJourney({ from = 0, to = 4 }: { from?: number; to?: number }) {
  const steps = claimSteps.slice(from, to);
  return (
    <ol className="journey-grid journey-grid--flow">
      {steps.map((step, index) => (
        <li className="journey-step card-quiet rise" style={delay(index, 170)} key={step}>
          <span className="journey-index">{from + index + 1}</span>
          <span>{step}</span>
        </li>
      ))}
    </ol>
  );
}

const chaosNodes = [
  { label: "Calls", x: 120, y: 110 },
  { label: "Emails", x: 640, y: 90 },
  { label: "Insurer", x: 760, y: 300 },
  { label: "Surveyor", x: 620, y: 420 },
  { label: "Invoice", x: 300, y: 430 },
  { label: "Claim Forms", x: 90, y: 320 },
  { label: "Documents", x: 450, y: 60 }
];

function CoordinationVisual({ mode }: { mode: "chaos" | "organized" }) {
  const organized = mode === "organized";
  return (
    <svg viewBox="0 0 900 520" className="scene-art" aria-hidden="true">
      {chaosNodes.map((node, index) => {
        const angle = (index / chaosNodes.length) * Math.PI * 2;
        const ox = organized ? 450 + Math.cos(angle) * 300 : node.x;
        const oy = organized ? 260 + Math.sin(angle) * 170 : node.y;
        const hubX = organized ? 450 : 450;
        const hubY = organized ? 260 : 260;
        return (
          <g key={node.label} className={organized ? "rise" : "node-chaos"} style={organized ? delay(index, 130) : delay(index, 90)}>
            <path
              d={`M${hubX} ${hubY} Q${(hubX + ox) / 2 + (organized ? 0 : (index % 2 ? 90 : -110))} ${(hubY + oy) / 2 + (organized ? 0 : (index % 3) * 40 - 40)} ${ox} ${oy}`}
              fill="none"
              stroke={organized ? "var(--accent)" : "currentColor"}
              strokeWidth={organized ? 5 : 4}
              strokeLinecap="round"
              opacity={organized ? 0.75 : 0.4}
              strokeDasharray={organized ? "none" : "2 12"}
            />
            <g transform={`translate(${ox},${oy})`}>
              <rect x="-58" y="-24" width="116" height="48" rx="12" fill="var(--card)" stroke="currentColor" strokeWidth="5" />
              <text x="0" y="7" textAnchor="middle" fontSize="19" fontWeight="750" fill="currentColor" stroke="none">
                {node.label}
              </text>
            </g>
          </g>
        );
      })}
      <g transform={`translate(${organized ? 450 : 450},${organized ? 260 : 260})`}>
        <circle r="46" fill="var(--card)" stroke="currentColor" strokeWidth="6" className={organized ? "" : "node-chaos"} />
        <g transform="translate(0,14) scale(0.42)">
          <PersonIcon />
        </g>
        <text x="0" y="-62" textAnchor="middle" fontSize="21" fontWeight="800" fill="currentColor" stroke="none">
          {organized ? "فهيم" : "حنتيرة"}
        </text>
      </g>
    </svg>
  );
}

/* ------------------------------ broker value -------------------------------- */

function BrokerValue({ mode }: { mode: "setup" | "remove" | "value" }) {
  if (mode === "setup") {
    return (
      <div className="broker-value-setup" dir="rtl">
        <div className="broker-value-flow rise">
          <span>شركة التأمين</span>
          <svg viewBox="-48 -18 96 36" aria-hidden="true">
            <ArrowLeft length={72} />
          </svg>
          <strong>وثيقة</strong>
          <svg viewBox="-48 -18 96 36" aria-hidden="true">
            <ArrowLeft length={72} />
          </svg>
          <span>العميل</span>
        </div>
        <p className="broker-value-question pop" style={delay(2, 180)}>
          طب فين قيمة الوسيط هنا؟
        </p>
      </div>
    );
  }
  if (mode === "remove") {
    return (
      <div className="value-words">
        {["Price?", "Policy?", "Paperwork?"].map((word, index) => (
          <span className="value-word strike pop" style={delay(index, 240)} key={word}>
            {word}
            <i />
          </span>
        ))}
      </div>
    );
  }
  return (
    <div className="value-words value-words--real">
      {[
        ["Advice", "نصيحة"],
        ["Comparison", "مقارنة"],
        ["Negotiation", "تفاوض"],
        ["Coordination", "تنسيق"],
        ["Support", "متابعة"]
      ].map(([en, ar], index) => (
        <span className="value-chip card-quiet rise" style={delay(index, 130)} key={en}>
          <strong>{en}</strong>
          <span>{ar}</span>
        </span>
      ))}
    </div>
  );
}

/* ------------------------------ closing scenes ------------------------------ */

function QuietScene() {
  return (
    <svg viewBox="0 0 900 520" className="scene-art" aria-hidden="true">
      <path d="M140 300 H760" stroke="currentColor" strokeWidth="4" strokeLinecap="round" opacity="0.35" />
      <g transform="translate(450,300)" opacity="0.6">
        <PauseDots />
      </g>
    </svg>
  );
}

function BigQuestion() {
  return (
    <svg viewBox="0 0 900 520" className="scene-art" aria-hidden="true">
      <g className="draw-path" style={{ strokeDasharray: 700, strokeDashoffset: 700 }}>
        <path
          d="M370 190 Q370 110 450 110 Q530 110 530 190 Q530 246 462 268 Q448 273 448 292 V316"
          fill="none"
          stroke="currentColor"
          strokeWidth="16"
          strokeLinecap="round"
        />
      </g>
      <circle cx="449" cy="376" r="13" fill="currentColor" className="pop" style={delay(4, 200)} />
    </svg>
  );
}

function LogoBadge() {
  const { company } = appConfig;
  return (
    <div className="logo-badge contact-logo-badge rise">
      <img src={publicAsset(company.logoPath)} alt={company.name} />
      <strong>{company.name}</strong>
      <span className="logo-tagline" dir="ltr">
        {company.tagline}
      </span>
    </div>
  );
}

function ContactReveal() {
  return (
    <div className="contact-reveal">
      <div className="contact-logo-transparent rise">
        <img src={publicAsset(appConfig.company.logoPath)} alt={appConfig.company.name} />
      </div>
      <p dir="ltr">{appConfig.company.tagline}</p>
    </div>
  );
}

function CreatorCredit() {
  return (
    <div className="creator-credit" dir="ltr">
      <p className="creator-credit-main rise">Made by Mohamed Tolba — Data Analyst</p>
      <p className="creator-credit-note rise" style={delay(1, 520)}>
        Not really in my usual scope.<br />
        They gave me the task anyway 🚶🚶.
      </p>
    </div>
  );
}

function ContactStats() {
  return (
    <div className="contact-stats">
      {appConfig.company.metrics.map((metric, index) => (
        <article className="contact-stat rise" style={delay(index, 140)} key={metric.value}>
          <strong dir="ltr">{metric.value}</strong>
          <span>{metric.label}</span>
          <p>{metric.detail}</p>
        </article>
      ))}
      <p className="contact-disclaimer">{appConfig.company.disclaimer}</p>
    </div>
  );
}

function ContactServes() {
  return (
    <article className="contact-serves">
      <div className="contact-audiences">
        {appConfig.company.audiences.map((audience, index) => (
          <span className="contact-pill rise" style={delay(index, 110)} key={audience}>{audience}</span>
        ))}
      </div>
      <div className="contact-products">
        {appConfig.company.retailProducts.map((product, index) => (
          <span className="contact-product pop" style={delay(index, 95)} key={product}>{product}</span>
        ))}
      </div>
    </article>
  );
}

function ContactFlow() {
  const steps = [
    "Understand Your Business",
    "Identify Risks",
    "Search the Insurance Market",
    "Compare & Negotiate",
    "Arrange Coverage",
    "Manage Policies",
    "Support Claims",
    "Renew & Improve"
  ];
  return (
    <div className="company-flow contact-flow">
      <p className="company-flow-name">
        {appConfig.company.name} — <span dir="ltr">{appConfig.company.tagline}</span>
      </p>
      <ol className="journey-grid">
        {steps.map((step, index) => (
          <li className="journey-step card-quiet rise" style={delay(index, 130)} key={step}>
            <span className="journey-index">{index + 1}</span>
            <span>{step}</span>
          </li>
        ))}
      </ol>
      <p className="company-flow-line">{appConfig.company.serviceLine}</p>
    </div>
  );
}

function PeekHantira() {
  return (
    <div className="peek-stage" aria-hidden="true">
      <svg viewBox="0 0 320 220" className="peek-art">
        <g stroke="currentColor" strokeWidth="7" strokeLinecap="round" strokeLinejoin="round" fill="none">
          <path d="M70 220 V150 Q70 60 160 60 Q250 60 250 150 V220" fill="var(--paper)" />
          <circle cx="132" cy="132" r="6" fill="currentColor" stroke="none" />
          <circle cx="188" cy="132" r="6" fill="currentColor" stroke="none" />
          <path d="M138 168 Q160 184 182 168" />
          <path d="M96 210 Q84 186 102 176 M224 210 Q236 186 218 176" />
        </g>
      </svg>
    </div>
  );
}

/* ---------------------------------- slider ---------------------------------- */

function WithoutBrokerPanel() {
  return (
    <svg viewBox="0 0 640 420" className="scene-art" aria-hidden="true">
      {[
        { label: "Insurers", x: 130, y: 90 },
        { label: "Quotations", x: 480, y: 80 },
        { label: "Claims", x: 560, y: 230 },
        { label: "Renewals", x: 470, y: 350 },
        { label: "Endorsements", x: 150, y: 340 },
        { label: "Policy Terms", x: 80, y: 220 },
        { label: "Emails", x: 320, y: 50 }
      ].map((node, index) => (
        <g key={node.label} className="node-chaos" style={delay(index, 80)}>
          <path
            d={`M320 225 Q${(320 + node.x) / 2 + (index % 2 ? 70 : -70)} ${(225 + node.y) / 2 - 30} ${node.x} ${node.y}`}
            fill="none"
            stroke="currentColor"
            strokeWidth="3.5"
            strokeDasharray="2 10"
            opacity="0.4"
          />
          <g transform={`translate(${node.x},${node.y})`}>
            <rect x="-56" y="-21" width="112" height="42" rx="10" fill="var(--card)" stroke="currentColor" strokeWidth="4" />
            <text x="0" y="6" textAnchor="middle" fontSize="17" fontWeight="700" fill="currentColor" stroke="none">
              {node.label}
            </text>
          </g>
        </g>
      ))}
      <g transform="translate(320,225)">
        <circle r="40" fill="var(--card)" stroke="currentColor" strokeWidth="6" />
        <g transform="translate(0,12) scale(0.36)">
          <PersonIcon />
        </g>
        <text x="0" y="-56" textAnchor="middle" fontSize="19" fontWeight="800" fill="currentColor" stroke="none">
          حنتيرة لوحده
        </text>
      </g>
    </svg>
  );
}

function WithBrokerPanel() {
  return (
    <svg viewBox="0 0 640 420" className="scene-art" aria-hidden="true">
      <path d="M560 210 H420 Q380 210 380 250 V300" fill="none" />
      {[
        { label: "حنتيرة", x: 540, y: 210, sub: "Client" },
        { label: "فهيم", x: 320, y: 210, sub: "Broker", accent: true },
        { label: "Insurance Market", x: 110, y: 210, sub: "Insurers" }
      ].map((node, index) => (
        <g key={node.label} className="rise" style={delay(index, 150)}>
          {index < 2 && (
            <path
              d={`M${node.x - 62} 210 H${node.x - 116}`}
              stroke="var(--accent)"
              strokeWidth="6"
              strokeLinecap="round"
              className="flow-arrow"
            />
          )}
          <g transform={`translate(${node.x},${node.y})`}>
            <circle r="44" fill="var(--card)" stroke={node.accent ? "var(--accent)" : "currentColor"} strokeWidth="6" />
            <g transform="translate(0,13) scale(0.4)">
              <PersonIcon />
            </g>
            <text x="0" y="-60" textAnchor="middle" fontSize="20" fontWeight="800" fill="currentColor" stroke="none">
              {node.label}
            </text>
            <text x="0" y="76" textAnchor="middle" fontSize="15" fontWeight="600" fill="var(--muted)" stroke="none">
              {node.sub}
            </text>
          </g>
        </g>
      ))}
      <g transform="translate(320,340)" className="rise" style={delay(3, 150)}>
        <rect x="-190" y="-24" width="380" height="48" rx="12" fill="none" stroke="var(--accent)" strokeWidth="5" />
        <text x="0" y="7" textAnchor="middle" fontSize="18" fontWeight="750" fill="var(--accent-ink)" stroke="none">
          اختيار • تفاوض • إدارة • متابعة
        </text>
      </g>
    </svg>
  );
}

function BrokerSlider() {
  const [withBroker, setWithBroker] = useState(55);
  return (
    <div className="broker-slider">
      <div className="broker-slider-stage card-frame" dir="ltr">
        <div className="broker-layer broker-layer--without">
          <span className="broker-layer-tag">WITHOUT BROKER</span>
          <WithoutBrokerPanel />
        </div>
        <div className="broker-layer broker-layer--with" style={{ clipPath: `inset(0 0 0 ${100 - withBroker}%)` }}>
          <span className="broker-layer-tag broker-layer-tag--accent">WITH BROKER</span>
          <WithBrokerPanel />
        </div>
        <div className="broker-handle" style={{ left: `${withBroker}%` }} aria-hidden="true">
          <i />
        </div>
        <input
          type="range"
          min={0}
          max={100}
          value={withBroker}
          onChange={(event) => setWithBroker(Number(event.target.value))}
          aria-label="قارن بين مع وسيط وبدون وسيط"
        />
      </div>
      <div className="broker-slider-hint">
        <span>بدون وسيط: تتواصل مع كل جهة لوحدك</span>
        <span>مع وسيط: نقطة تنسيق واحدة — والدور عليك ما زال موجودًا</span>
      </div>
    </div>
  );
}

/* --------------------------------- registry --------------------------------- */

const registry: Record<string, () => React.ReactElement> = {
  dark: OpeningSpotlight,
  "dark-center": CenterSpotlight,
  "business-assets": BusinessCore,
  "assets-lineup": BusinessLineup,
  "protected-business": ProtectedBusiness,
  "sunny-road": SunnyRoad,
  driving: DrivingScene,
  crash: CrashScene,
  invoice: InvoiceVisual,
  "broken-car": BrokenCar,
  impact: ImpactVisual,
  formula: RiskFormula,
  "without-insurance": () => (
    <FlowVisual
      nodes={[
        { label: "Incident", sub: "حادث", icon: "crack", tone: "var(--danger)" },
        { label: "حنتيرة", icon: "person" },
        { label: "Financial Loss", sub: "خسارة مالية", icon: "loss", tone: "var(--danger)" }
      ]}
    />
  ),
  "with-insurance": () => (
    <FlowVisual
      nodes={[
        { label: "حنتيرة", icon: "person" },
        { label: "Premium", sub: "قسط التأمين", icon: "coin", tone: "var(--accent)" },
        { label: "Insurance Company", sub: "شركة التأمين", icon: "insurer", tone: "var(--accent)" }
      ]}
    />
  ),
  "covered-loss": () => (
    <FlowVisual
      nodes={[
        { label: "Insurance Company", sub: "شركة التأمين", icon: "insurer", tone: "var(--accent)" },
        { label: "Compensation", sub: "تعويض طبقًا للوثيقة", icon: "policy", tone: "var(--accent)" },
        { label: "حنتيرة", icon: "person" }
      ]}
    />
  ),
  "insurance-market": MarketRow,
  "offer-storm": OfferStorm,
  "paper-pile": PaperPile,
  "three-offers": () => <OfferPanels />,
  "offer-details": () => <OfferPanels detail />,
  "term-cloud": () => <TermCloud />,
  "term-cloud-tighten": () => <TermCloud mode="tight" />,
  freeze: () => <TermCloud mode="frozen" />,
  "faheem-entry": DoorEntry,
  "broker-flow": () => <BrokerJourney from={0} to={6} />,
  "broker-flow-2": () => <BrokerJourney from={6} to={12} />,
  logistics: LogisticsVisual,
  "shield-build": ShieldBuild,
  "protection-vote": ProtectionVoteVisual,
  "protection-map": ProtectionMapVisual,
  shield: ShieldAroundAssets,
  "quiet-warehouse": QuietWarehouse,
  "stylized-fire": WarehouseFire,
  "claim-form": ClaimFormVisual,
  "claim-journey": () => <ClaimJourney from={0} to={4} />,
  "claim-journey-2": () => <ClaimJourney from={4} to={6} />,
  "claims-chaos": () => <CoordinationVisual mode="chaos" />,
  "organized-lines": () => <CoordinationVisual mode="organized" />,
  quiet: QuietScene,
  "remove-words": () => <BrokerValue mode="remove" />,
  "broker-value-setup": () => <BrokerValue mode="setup" />,
  "broker-value": () => <BrokerValue mode="value" />,
  "broker-slider": BrokerSlider,
  "final-question": BigQuestion,
  logo: LogoBadge,
  "contact-reveal": ContactReveal,
  "contact-stats": ContactStats,
  "contact-serves": ContactServes,
  "contact-flow": ContactFlow,
  peek: PeekHantira,
  "creator-credit": CreatorCredit
};

export const sceneVisualIds = Object.keys(registry);

function TypographicFallback({ id }: { id: string }) {
  return (
    <div className="scene-wordmark rise">
      <span>{id.replace(/-/g, " ")}</span>
    </div>
  );
}

export function SceneVisual({ id, fallback }: VisualProps & { fallback?: React.ReactNode }) {
  const Component = registry[id];
  if (Component) return <Component />;
  return <>{fallback ?? <TypographicFallback id={id} />}</>;
}
