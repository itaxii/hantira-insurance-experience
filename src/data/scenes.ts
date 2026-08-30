import type { Scene } from "../types";

export const scenes: Scene[] = [
  {
    id: "meet-hantira",
    title: "Meet Hantira",
    beats: [
      { id: "dark", headline: "ده حنتيرة.", visual: "dark", hantira: { animation: "walk", expression: "neutral" }, effects: ["footsteps"] },
      { id: "company", headline: "حنتيرة عنده شركة.", visual: "business-assets", hantira: { animation: "wave", expression: "happy" } },
      { id: "assets", headline: "مكتب، عربيات، موظفين، مخزن، وبضاعة.", visual: "assets-lineup", hantira: { animation: "point", expression: "proud" } },
      { id: "cost", dialogue: "وفي حاجة واحدة بس مش بحب أصرف عليها...", hantira: { expression: "suspicious", animation: "think" } },
      { id: "insurance", headline: "التأمين", dialogue: "يعني أدفع فلوس... عشان حاجة ممكن ما تحصلش؟", hantira: { expression: "confused", animation: "facepalm" } }
    ]
  },
  {
    id: "join-once",
    title: "شارك حنتيرة الرحلة",
    kind: "join",
    onceOnlyQr: true,
    beats: [
      {
        id: "qr",
        headline: "شارك حنتيرة الرحلة",
        body: "امسح الـ QR مرة واحدة وخليك معانا لحد نهاية الرحلة.",
        visual: "qr"
      }
    ]
  },
  {
    id: "hantira-opinion",
    title: "رأي الجمهور",
    kind: "interaction",
    interaction: {
      id: "hantira-opinion",
      sceneId: "hantira-opinion",
      type: "single",
      question: "حنتيرة عنده حق؟",
      options: [
        { id: "yes", label: "آه... ليه يدفع؟" },
        { id: "no", label: "لأ... لازم يأمّن" }
      ],
      allowChange: true,
      explanation: "دي بداية تفكير حنتيرة. هنشوف بعد شوية هل توفير الـ Premium دايمًا قرار ذكي؟",
      nameVisualization: true
    },
    beats: [
      { id: "ask", headline: "حنتيرة عنده حق؟", hantira: { expression: "suspicious", animation: "point" } },
      { id: "react", headline: "حنتيرة سامع آراءكم...", hantira: { expression: "thinking", animation: "think" } }
    ]
  },
  {
    id: "nice-morning",
    title: "The Nice Morning",
    beats: [
      { id: "time", kicker: "Monday — 8:30 AM", headline: "صباح الفل... النهارده يوم هادي جدًا.", visual: "sunny-road", hantira: { animation: "idle", expression: "happy" }, effects: ["car-engine"] },
      { id: "drive", headline: "حنتيرة سايق ومطمن.", visual: "driving", hantira: { expression: "happy" } },
      { id: "crash", headline: "BAAAAM", visual: "crash", hantira: { expression: "shocked", animation: "panic" }, effects: ["crash", "shake"] },
      { id: "invoice", headline: "350,000 EGP", body: "هو الرقم ده فيه decimal وأنا مش شايفه؟", visual: "invoice", hantira: { expression: "shocked", animation: "fall" }, effects: ["invoice-reveal"] }
    ]
  },
  {
    id: "who-pays",
    title: "Who Pays?",
    kind: "interaction",
    interaction: {
      id: "who-pays",
      sceneId: "who-pays",
      type: "single",
      question: "مين هيدفع الـ 350 ألف؟",
      options: [
        { id: "a", label: "A — حنتيرة" },
        { id: "b", label: "B — الطرف التاني" },
        { id: "c", label: "C — شركة التأمين" },
        { id: "d", label: "D — على حسب الحالة والتغطية" }
      ],
      correctAnswer: "d",
      allowChange: false,
      explanation: "التأمين مش معناه إن شركة التأمين تدفع أي حاجة. الدفع يعتمد على التغطية والشروط وحدود الوثيقة.",
      nameVisualization: true
    },
    beats: [{ id: "ask", headline: "مين هيدفع؟", hantira: { expression: "worried", animation: "think" } }]
  },
  {
    id: "what-is-risk",
    title: "What Is Risk?",
    beats: [
      { id: "risk", headline: "RISK", body: "حاجة ممكن تحصل.", visual: "broken-car", hantira: { expression: "worried" } },
      { id: "cost", headline: "ولو حصلت... بتكلف فلوس.", visual: "impact" },
      { id: "formula", headline: "Probability × Impact", body: "تبسيط يساعدنا نفهم الفكرة، مش قانون ثابت لكل الحالات.", visual: "formula" },
      { id: "ready", dialogue: "المشكلة مش إن الحاجة ممكن تحصل... المشكلة إنها تحصل وأنا مش مستعد لها.", hantira: { expression: "thinking", animation: "think" } }
    ]
  },
  {
    id: "insurance-30",
    title: "Insurance In 30 Seconds",
    beats: [
      { id: "without", headline: "بدون تأمين", body: "Incident → حنتيرة → Financial Loss", visual: "without-insurance", hantira: { expression: "worried" } },
      { id: "with", headline: "مع التأمين", body: "حنتيرة → Premium → Insurance Company", visual: "with-insurance" },
      { id: "covered", headline: "لو الخطر مغطى", body: "Insurance Company → تعويض طبقًا للوثيقة → حنتيرة", visual: "covered-loss", hantira: { expression: "relieved" } },
      { id: "takeaway", headline: "التأمين بينقل جزء من الخطر المالي", body: "مقابل Premium وطبقًا لشروط الوثيقة.", dialogue: "أنا مش بشتري حادث... أنا بشتري حماية مالية لو حصل خطر مغطى." }
    ]
  },
  {
    id: "shopping",
    title: "Hantira Goes Shopping",
    beats: [
      { id: "market", dialogue: "تمام... هأمّن.", visual: "insurance-market", hantira: { expression: "proud", animation: "walk" } },
      { id: "offers", headline: "Insurance Market", body: "Company A • Company B • Company C • Company D • Company E • Company F", visual: "offer-storm", hantira: { expression: "confused", animation: "panic" } },
      { id: "pile", headline: "العروض كترت.", visual: "paper-pile", hantira: { expression: "shocked" }, effects: ["paper-drop"] }
    ]
  },
  {
    id: "choose-offer",
    title: "Choose The Offer",
    beats: [
      { id: "offers", headline: "ثلاث عروض وهمية", body: "Offer A: Premium 20K\nOffer B: Premium 27K\nOffer C: Premium 35K", visual: "three-offers", hantira: { expression: "happy", animation: "point" } },
      { id: "cheap", dialogue: "الأرخص طبعًا!", hantira: { expression: "proud", animation: "point" } }
    ]
  },
  {
    id: "broker-challenge-1",
    title: "Broker Challenge",
    kind: "interaction",
    interaction: {
      id: "broker-challenge-1",
      sceneId: "broker-challenge-1",
      type: "single",
      question: "لو أنت مكان حنتيرة، تختار مين؟",
      options: [
        { id: "cheap", label: "الأرخص" },
        { id: "mid", label: "المتوسط" },
        { id: "expensive", label: "الأغلى" },
        { id: "more-info", label: "محتاج معلومات أكتر" }
      ],
      correctAnswer: "more-info",
      allowChange: false,
      explanation: "Cheapest ≠ Best. Most Expensive ≠ Best. Right Fit = Best.",
      nameVisualization: true
    },
    beats: [
      { id: "ask", headline: "اختار العرض", visual: "three-offers" },
      { id: "reveal", headline: "Right Fit = Best", body: "Offer A: Deductible 100K، Coverage Limited، Exclusions Several\nOffer B: Deductible 25K، Coverage Better، Claims Support Good\nOffer C: Deductible 10K، Coverage Broader، Additional Benefits", dialogue: "أنا كنت هلبس.", hantira: { expression: "shocked", animation: "facepalm" } }
    ]
  },
  {
    id: "complexity",
    title: "Complexity Explosion",
    beats: [
      { id: "terms", headline: "Premium • Deductible • Limits • Exclusions • Conditions • Claims • Add-ons • Coverage", visual: "term-cloud", hantira: { expression: "worried", animation: "panic" } },
      { id: "freeze", headline: "Freeze.", body: "لما التفاصيل تكتر، القرار محتاج تنظيم.", visual: "freeze", hantira: { expression: "shocked" } }
    ]
  },
  {
    id: "meet-faheem",
    title: "Meet Faheem",
    beats: [
      { id: "enter", headline: "فهيم دخل بهدوء.", visual: "faheem-entry", hantira: { expression: "confused" }, faheem: { expression: "neutral", animation: "walk" } },
      { id: "not-agent", dialogue: "حنتيرة: إنت مندوب شركة أنهي واحدة؟\nفهيم: ولا واحدة.", faheem: { expression: "happy" } },
      { id: "broker", headline: "INSURANCE BROKER", dialogue: "أنا مش هختارلك شركة وخلاص... أنا هساعدك تختار الحل المناسب ليك.", faheem: { expression: "proud", animation: "point" } }
    ]
  },
  {
    id: "broker-does",
    title: "What Does A Broker Do?",
    beats: [
      { id: "flow", headline: "Client → Understand Needs → Identify Risks → Design Coverage → Approach Market", visual: "broker-flow", faheem: { expression: "neutral", animation: "point" } },
      { id: "flow2", headline: "Compare → Negotiate → Recommend → Arrange Coverage → Manage Policies → Support Claims → Renew & Improve", visual: "broker-flow" },
      { id: "role", dialogue: "دوري مش أوصل ورقة من هنا لهنا. دوري إني أبسّط السوق وأساعدك تاخد قرار أفضل.", faheem: { expression: "happy" } }
    ]
  },
  {
    id: "hantira-logistics",
    title: "Hantira Logistics",
    beats: [
      { id: "business", headline: "Hantira Logistics", body: "30 Trucks • 1 Warehouse • 120 Employees • International Shipments", visual: "logistics" },
      { id: "risks", headline: "إيه المخاطر اللي شايفينها؟", hantira: { expression: "thinking", animation: "think" }, faheem: { expression: "neutral" } }
    ]
  },
  {
    id: "build-protection",
    title: "Build Protection",
    kind: "interaction",
    interaction: {
      id: "build-protection",
      sceneId: "build-protection",
      type: "multi",
      question: "إيه أنواع الحماية المناسبة نفكر فيها؟",
      options: [
        { id: "motor", label: "Motor", mapsTo: "Vehicles → Motor Fleet" },
        { id: "property", label: "Property", mapsTo: "Warehouse → Property" },
        { id: "medical", label: "Medical", mapsTo: "Employees → Medical" },
        { id: "marine", label: "Marine Cargo", mapsTo: "Cargo → Marine" },
        { id: "liability", label: "Liability", mapsTo: "Business Liability → Liability" },
        { id: "fire", label: "Fire-related property risks", mapsTo: "Warehouse → Fire risk extension" }
      ],
      allowChange: true,
      explanation: "كل نشاط له Risk Profile مختلف. الفكرة مش إن كل شركة تحتاج كل تغطية، الفكرة إن البرنامج يتفصل على النشاط.",
      nameVisualization: false
    },
    beats: [
      { id: "ask", headline: "Build Protection", visual: "shield-build" },
      { id: "shield", headline: "برنامج حماية مناسب للنشاط", dialogue: "حنتيرة: أنا كنت فاكر إني محتاج وثيقة.\nفهيم: إنت محتاج برنامج حماية مناسب لنشاطك.", visual: "shield" }
    ]
  },
  {
    id: "six-months",
    title: "Six Months Later",
    beats: [
      { id: "later", headline: "Six months later...", visual: "quiet-warehouse" },
      { id: "alarm", headline: "Alarm.", visual: "stylized-fire", effects: ["alarm"], hantira: { expression: "shocked", animation: "panic" } },
      { id: "call", dialogue: "فهيم!!!", hantira: { expression: "worried" } }
    ]
  },
  {
    id: "claim-challenge",
    title: "Claim Challenge",
    kind: "interaction",
    interaction: {
      id: "claim-challenge",
      sceneId: "claim-challenge",
      type: "single",
      question: "حصل Claim... تعمل إيه الأول؟",
      options: [
        { id: "a", label: "A — أصلّح كل حاجة وبعدين أبلغ" },
        { id: "b", label: "B — أبلغ عن الحادث وأتبع الإجراءات والمستندات المطلوبة" },
        { id: "c", label: "C — أرمي الورق" },
        { id: "d", label: "D — أنزل Angry Post على Facebook" }
      ],
      correctAnswer: "b",
      allowChange: false,
      explanation: "الإجراء الدقيق يعتمد على نوع الخسارة ونص الوثيقة، لكن البداية الصحيحة غالبًا هي الإبلاغ واتباع الإجراءات والمستندات المطلوبة.",
      nameVisualization: true
    },
    beats: [{ id: "ask", headline: "Claim Challenge", visual: "claim-form", hantira: { expression: "worried" } }]
  },
  {
    id: "claims-journey",
    title: "Claims Journey",
    beats: [
      { id: "journey", headline: "Incident → Notification → Documentation → Survey / Assessment", visual: "claim-journey", faheem: { expression: "neutral", animation: "point" } },
      { id: "settlement", headline: "Insurer Review → Settlement according to policy", dialogue: "دوري مش بينتهي لما الوثيقة تتصدر.", faheem: { expression: "happy" } }
    ]
  },
  {
    id: "claims-chaos",
    title: "Claims Chaos",
    beats: [
      { id: "chaos", headline: "Calls • Emails • Insurer • Surveyor • Invoices • Claim Forms • Documents", visual: "claims-chaos", hantira: { expression: "shocked", animation: "panic" } },
      { id: "organized", headline: "One Point of Coordination", body: "فهيم بينظم التواصل، لكنه لا يلغي دور شركة التأمين أو المعاين أو مسؤوليات العميل.", visual: "organized-lines", faheem: { expression: "proud" } }
    ]
  },
  {
    id: "insurance-value",
    title: "Insurance Value",
    beats: [
      { id: "before", headline: "You buy insurance before the problem.", visual: "quiet" },
      { id: "after", headline: "But you understand its value after the problem.", body: "بتشتري التأمين قبل الخطر... لكن غالبًا بتحس بقيمته وقت الخسارة.", hantira: { expression: "relieved" } }
    ]
  },
  {
    id: "broker-value",
    title: "What Does The Broker Really Add?",
    beats: [
      { id: "remove", headline: "Price? Policy? Paperwork?", visual: "remove-words", faheem: { expression: "suspicious" } },
      { id: "reveal", headline: "Advice • Comparison • Negotiation • Coordination • Support", dialogue: "الوسيط مش مجرد ناقل وثيقة. قيمته في الخبرة والمقارنة والتفاوض والمتابعة.", faheem: { expression: "proud" } }
    ]
  },
  {
    id: "with-without",
    title: "With Broker / Without Broker",
    beats: [
      { id: "slider", headline: "WITH BROKER / WITHOUT BROKER", body: "حرّك السلايدر وشوف الفرق في وضوح الرحلة.", visual: "broker-slider", hantira: { expression: "thinking" }, faheem: { expression: "neutral" } }
    ]
  },
  {
    id: "final-understanding",
    title: "Final Understanding",
    kind: "interaction",
    interaction: {
      id: "final-understanding",
      sceneId: "final-understanding",
      type: "single",
      question: "حنتيرة محتاج شركة تأمين ولا وسيط؟",
      options: [
        { id: "company", label: "شركة تأمين" },
        { id: "broker", label: "وسيط" },
        { id: "both", label: "الاتنين" }
      ],
      correctAnswer: "both",
      allowChange: false,
      explanation: "شركة التأمين تتحمل الخطر وفقًا للوثيقة. الوسيط يساعد العميل في الاختيار، التفاوض، الإدارة والمتابعة.",
      nameVisualization: true
    },
    beats: [{ id: "ask", headline: "آخر سؤال", visual: "final-question", hantira: { expression: "thinking" }, faheem: { expression: "happy" } }]
  },
  {
    id: "our-company",
    title: "What Our Company Does",
    beats: [
      { id: "config", headline: "What do we do?", body: "Understand Your Business → Identify Risks → Search the Insurance Market → Compare & Negotiate → Arrange Coverage → Manage Policies → Support Claims → Renew & Improve", visual: "company-flow", faheem: { expression: "proud" } }
    ]
  },
  {
    id: "final-hantira",
    title: "Final Hantira",
    beats: [
      { id: "protected", headline: "حنتيرة رجع لنفس الشركة... بس المرة دي محمية.", visual: "protected-business", hantira: { expression: "relieved" }, faheem: { expression: "happy" } },
      { id: "learned", dialogue: "أنا كنت فاكر التأمين مصروف. دلوقتي فهمت إنه وسيلة أحمي بيها اللي بنيته.", hantira: { expression: "proud" } },
      { id: "goal", dialogue: "فهيم: وده هو الهدف.", faheem: { expression: "happy" } }
    ]
  },
  {
    id: "ending",
    title: "Ending",
    kind: "ending",
    beats: [
      { id: "question", headline: "طب لو بكرة حصل حاجة؟", visual: "dark-center", hantira: { expression: "thinking" } },
      { id: "prepare", headline: "You can't predict every risk.", body: "But you can prepare for it.", visual: "logo" },
      { id: "tagline", headline: "Your Risk. Our Expertise. Better Protection.", visual: "logo" },
      { id: "joke", headline: "بس سؤال أخير...", body: "الـ Premium ينفع يتقسط؟", visual: "peek", hantira: { expression: "confused", animation: "look-right" } }
    ]
  }
];

export const interactions = scenes.flatMap((scene) => (scene.interaction ? [scene.interaction] : []));
