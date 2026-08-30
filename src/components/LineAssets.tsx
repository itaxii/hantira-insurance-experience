export function BusinessAssets({ variant = "default" }: { variant?: string }) {
  return (
    <svg viewBox="0 0 900 260" className="line-assets" aria-hidden="true">
      <g fill="none" stroke="currentColor" strokeWidth="8" strokeLinecap="round" strokeLinejoin="round">
        <path d="M50 210 V90 L150 50 L250 90 V210 Z" />
        <path d="M80 130 H220 M80 170 H220" />
        <path d="M310 190 H470 L500 140 H610 L660 190 H700" />
        <circle cx="360" cy="205" r="22" />
        <circle cx="610" cy="205" r="22" />
        <path d="M740 210 V80 H850 V210 Z M760 120 H830 M760 160 H830" />
        <path d="M520 100 H610 V140 H520 Z" />
        <path d="M120 50 V22 M118 22 H170" />
        {variant.includes("protected") && <path d="M20 32 Q450 -10 880 32 V118 Q450 210 20 118 Z" stroke="var(--accent)" />}
      </g>
    </svg>
  );
}

export function OfferCards() {
  const offers = [
    ["Offer A", "Premium 20K", "Deductible 100K", "Coverage Limited"],
    ["Offer B", "Premium 27K", "Deductible 25K", "Claims Support Good"],
    ["Offer C", "Premium 35K", "Deductible 10K", "Coverage Broader"]
  ];
  return (
    <div className="offer-grid">
      {offers.map((offer) => (
        <article className="offer-card" key={offer[0]}>
          {offer.map((line, index) => (index === 0 ? <h3 key={line}>{line}</h3> : <p key={line}>{line}</p>))}
        </article>
      ))}
    </div>
  );
}

export function TermCloud() {
  return (
    <div className="term-cloud" aria-hidden="true">
      {["Premium", "Deductible", "Limits", "Exclusions", "Conditions", "Claims", "Add-ons", "Coverage"].map((term, index) => (
        <span key={term} style={{ "--i": index } as React.CSSProperties}>
          {term}
        </span>
      ))}
    </div>
  );
}

export function BrokerSlider() {
  return (
    <div className="comparison-slider">
      <div>
        <strong>WITHOUT BROKER</strong>
        <p>حنتيرة بيتعامل لوحده مع عروض، شروط، Claims، Renewals، Emails.</p>
      </div>
      <input type="range" min="0" max="100" defaultValue="55" aria-label="With broker comparison slider" />
      <div>
        <strong>WITH BROKER</strong>
        <p>حنتيرة → فهيم / Broker → Insurance Market. أوضح، منظم، لكن العميل ما زال له دور.</p>
      </div>
    </div>
  );
}

export function SimpleFlow({ text }: { text: string }) {
  return (
    <div className="flow-line">
      {text.split("→").map((part) => (
        <span key={part.trim()}>{part.trim()}</span>
      ))}
    </div>
  );
}
