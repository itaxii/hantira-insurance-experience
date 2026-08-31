import type { Scene } from "../types";

export const scenes: Scene[] = [
  {
    id: "meet-hantira",
    title: "Meet Hantira",
    beats: [
      { id: "dark", visual: "dark", mood: "dark", headline: "ده حنتيرة.", hantira: { animation: "walk", expression: "neutral" }, effects: ["footsteps"] },
      { id: "company", headline: "حنتيرة عنده شركة.", visual: "business-assets", hantira: { animation: "wave", expression: "happy" } },
      { id: "assets", headline: "مكتب، عربيات، موظفين، مخزن، وبضاعة.", visual: "assets-lineup", hantira: { animation: "point", expression: "proud" } },
      { id: "cost", dialogue: "وفي حاجة واحدة بس مش بحب أصرف عليها...", speaker: "hantira", hantira: { expression: "suspicious", animation: "think" } },
      { id: "insurance", visual: "dark-center", mood: "dark", headline: "التأمين", dialogue: "يعني أدفع فلوس... عشان حاجة ممكن ما تحصلش؟", speaker: "hantira", hantira: { expression: "confused", animation: "facepalm" } }
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
      { id: "drive", headline: "حنتيرة سايق ومطمن.", visual: "driving", effects: ["car-engine"] },
      { id: "crash", headline: "BAAAAM", visual: "crash", hantira: { expression: "shocked", animation: "panic" }, effects: ["crash", "shake"] },
      { id: "invoice", kicker: "INVOICE", visual: "invoice", dialogue: "هو الرقم ده فيه decimal وأنا مش شايفه؟", speaker: "hantira", hantira: { expression: "shocked", animation: "fall" }, effects: ["invoice-reveal"] }
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
    beats: [{ id: "ask", headline: "مين هيدفع الـ 350 ألف؟", visual: "invoice", hantira: { expression: "worried", animation: "think" } }]
  },
  {
    id: "what-is-risk",
    title: "What Is Risk?",
    beats: [
      { id: "risk", kicker: "RISK", headline: "حاجة ممكن تحصل.", visual: "broken-car", hantira: { expression: "worried" } },
      { id: "cost", headline: "ولو حصلت... بتكلف فلوس.", visual: "impact" },
      { id: "formula", headline: "Probability × Impact", body: "تبسيط يساعدنا نفهم الفكرة — ده نموذج تعليمي مبسّط، مش قانون ثابت لكل الحالات.", visual: "formula" },
      { id: "ready", dialogue: "المشكلة مش إن الحاجة ممكن تحصل...", speaker: "hantira", hantira: { expression: "thinking", animation: "think" } },
      { id: "ready-2", dialogue: "المشكلة إنها تحصل وأنا مش مستعد لها.", speaker: "hantira", hantira: { expression: "worried" } }
    ]
  },
  {
    id: "insurance-30",
    title: "Insurance In 30 Seconds",
    beats: [
      { id: "without", headline: "بدون تأمين", visual: "without-insurance", hantira: { expression: "worried" } },
      { id: "with", headline: "مع التأمين", visual: "with-insurance" },
      { id: "covered", headline: "لو الخطر مغطى", visual: "covered-loss", hantira: { expression: "relieved" } },
      {
        id: "takeaway",
        headline: "التأمين بينقل جزء من الخطر المالي للجهة المؤمِّنة مقابل Premium وطبقًا لشروط الوثيقة.",
        dialogue: "أنا مش بشتري حادث... أنا بشتري حماية مالية لو حصل خطر مغطى.",
        speaker: "hantira",
        hantira: { expression: "proud" }
      }
    ]
  },
  {
    id: "shopping",
    title: "Hantira Goes Shopping",
    beats: [
      { id: "market", dialogue: "تمام... هأمّن.", speaker: "hantira", visual: "insurance-market", hantira: { expression: "proud", animation: "walk" } },
      { id: "offers", headline: "Insurance Market", body: "Company A • Company B • Company C • Company D • Company E • Company F", visual: "offer-storm", hantira: { expression: "confused", animation: "panic" } },
      { id: "pile", headline: "العروض كترت.", visual: "paper-pile", hantira: { expression: "shocked" }, effects: ["paper-drop"] }
    ]
  },
  {
    id: "choose-offer",
    title: "Choose The Offer",
    beats: [
      { id: "offers", headline: "ثلاث عروض وهمية", visual: "three-offers", hantira: { expression: "happy", animation: "point" } },
      { id: "cheap", dialogue: "الأرخص طبعًا!", speaker: "hantira", hantira: { expression: "proud", animation: "point" } }
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
      { id: "ask", headline: "اختار العرض", visual: "three-offers", hantira: { expression: "thinking" } },
      { id: "reveal", headline: "Right Fit = Best", visual: "offer-details", dialogue: "أنا كنت هلبس.", speaker: "hantira", hantira: { expression: "shocked", animation: "facepalm" } }
    ]
  },
  {
    id: "complexity",
    title: "Complexity Explosion",
    beats: [
      { id: "terms", headline: "لغة التأمين...", visual: "term-cloud", hantira: { expression: "worried", animation: "panic" } },
      { id: "freeze", headline: "Freeze.", body: "لما التفاصيل تكتر، القرار محتاج تنظيم.", visual: "freeze", hantira: { expression: "shocked" } }
    ]
  },
  {
    id: "meet-faheem",
    title: "Meet Faheem",
    beats: [
      { id: "enter", headline: "فهيم دخل بهدوء.", visual: "faheem-entry", hantira: { expression: "confused" }, faheem: { expression: "neutral", animation: "walk" } },
      { id: "hantira-asks", dialogue: "إنت مندوب شركة أنهي واحدة؟", speaker: "hantira", hantira: { expression: "suspicious" }, faheem: { expression: "neutral" } },
      { id: "faheem-reply", dialogue: "ولا واحدة.", speaker: "faheem", faheem: { expression: "happy" }, hantira: { expression: "confused" } },
      { id: "broker", kicker: "INSURANCE BROKER", headline: "مش مندوب... وسيط.", dialogue: "أنا مش هختارلك شركة وخلاص... أنا هساعدك تختار الحل المناسب ليك.", speaker: "faheem", faheem: { expression: "proud", animation: "point" } }
    ]
  },
  {
    id: "broker-does",
    title: "What Does A Broker Do?",
    beats: [
      { id: "flow", headline: "رحلة الوسيط — من أول العميل", visual: "broker-flow", faheem: { expression: "neutral", animation: "point" } },
      { id: "flow2", headline: "لحد ما التغطية شغالة وتتطور", visual: "broker-flow-2" },
      { id: "role", dialogue: "دوري مش أوصل ورقة من هنا لهنا.", speaker: "faheem", faheem: { expression: "suspicious" } },
      { id: "role-2", dialogue: "دوري إني أبسّط السوق وأساعدك تاخد قرار أفضل.", speaker: "faheem", faheem: { expression: "proud" } }
    ]
  },
  {
    id: "hantira-logistics",
    title: "Hantira Logistics",
    beats: [
      { id: "business", headline: "Hantira Logistics", visual: "logistics" },
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
      { id: "ask", headline: "Build Protection", visual: "shield-build", faheem: { expression: "neutral", animation: "point" } },
      { id: "shield", headline: "برنامج حماية مناسب للنشاط", visual: "shield" },
      { id: "shield-2", dialogue: "أنا كنت فاكر إني محتاج وثيقة.", speaker: "hantira", hantira: { expression: "confused" }, faheem: { expression: "happy" } },
      { id: "shield-3", dialogue: "إنت محتاج برنامج حماية مناسب لنشاطك.", speaker: "faheem", faheem: { expression: "proud" } }
    ]
  },
  {
    id: "six-months",
    title: "Six Months Later",
    beats: [
      { id: "later", kicker: "Six months later...", headline: "كل حاجة ماشية تمام.", visual: "quiet-warehouse" },
      { id: "alarm", headline: "Alarm.", visual: "stylized-fire", effects: ["alarm", "shake"], hantira: { expression: "shocked", animation: "panic" } },
      { id: "call", headline: "فهيم!!!", hantira: { expression: "worried", animation: "panic" } }
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
    beats: [{ id: "ask", headline: "حصل Claim... تعمل إيه الأول؟", visual: "claim-form", hantira: { expression: "worried" } }]
  },
  {
    id: "claims-journey",
    title: "Claims Journey",
    beats: [
      { id: "journey", headline: "رحلة الـ Claim", visual: "claim-journey", faheem: { expression: "neutral", animation: "point" } },
      { id: "settlement", headline: "التسوية طبقًا للوثيقة", visual: "claim-journey-2" },
      { id: "role", dialogue: "دوري مش بينتهي لما الوثيقة تتصدر.", speaker: "faheem", faheem: { expression: "proud" } }
    ]
  },
  {
    id: "claims-chaos",
    title: "Claims Chaos",
    beats: [
      { id: "chaos", headline: "بدون تنسيق...", visual: "claims-chaos", hantira: { expression: "shocked", animation: "panic" } },
      { id: "organized", headline: "One Point of Coordination", visual: "organized-lines", body: "فهيم بينظم التواصل — لكنه لا يلغي دور شركة التأمين أو المعاين أو مسؤوليات العميل.", faheem: { expression: "proud" } }
    ]
  },
  {
    id: "insurance-value",
    title: "Insurance Value",
    beats: [
      { id: "before", kicker: "قبل الخطر", headline: "You buy insurance before the problem.", visual: "quiet" },
      { id: "after", kicker: "وقت الخسارة", headline: "But you understand its value after the problem.", body: "بتشتري التأمين قبل الخطر...\nلكن غالبًا بتحس بقيمته وقت الخسارة.", hantira: { expression: "relieved" } }
    ]
  },
  {
    id: "broker-value",
    title: "What Does The Broker Really Add?",
    beats: [
      { id: "remove", headline: "إيه اللي مش هو؟", visual: "remove-words", faheem: { expression: "suspicious" } },
      { id: "reveal", headline: "القيمة الحقيقية", visual: "broker-value" },
      { id: "role", dialogue: "الوسيط مش مجرد ناقل وثيقة.", speaker: "faheem", faheem: { expression: "suspicious" } },
      { id: "role-2", dialogue: "قيمته في الخبرة والمقارنة والتفاوض والمتابعة.", speaker: "faheem", faheem: { expression: "proud" } }
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
      { id: "config", headline: "What do we do?", visual: "company-flow", faheem: { expression: "proud", animation: "point" } }
    ]
  },
  {
    id: "final-hantira",
    title: "Final Hantira",
    beats: [
      { id: "protected", headline: "حنتيرة رجع لنفس الشركة... بس المرة دي محمية.", visual: "protected-business", hantira: { expression: "relieved" }, faheem: { expression: "happy" } },
      { id: "learned", dialogue: "أنا كنت فاكر التأمين مصروف.", speaker: "hantira", hantira: { expression: "thinking" }, faheem: { expression: "neutral" } },
      { id: "learned-2", dialogue: "دلوقتي فهمت إنه وسيلة أحمي بيها اللي بنيته.", speaker: "hantira", hantira: { expression: "proud" } },
      { id: "goal", dialogue: "وده هو الهدف.", speaker: "faheem", faheem: { expression: "happy" } }
    ]
  },
  {
    id: "ending",
    title: "Ending",
    kind: "ending",
    beats: [
      { id: "question", headline: "طب لو بكرة حصل حاجة؟", visual: "dark-center", mood: "dark", hantira: { expression: "thinking" } },
      { id: "prepare", headline: "You can't predict every risk.", body: "But you can prepare for it.", visual: "dark-center", mood: "dark", hantira: { expression: "proud" } },
      { id: "tagline", headline: "", visual: "logo", mood: "dark" },
      { id: "peek", headline: "بس سؤال أخير...", visual: "peek", mood: "dark" },
      { id: "joke", headline: "", visual: "peek", mood: "dark", dialogue: "الـ Premium ينفع يتقسط؟", speaker: "hantira" }
    ]
  }
];

export const interactions = scenes.flatMap((scene) => (scene.interaction ? [scene.interaction] : []));
