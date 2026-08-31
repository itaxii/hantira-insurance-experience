import { contactTheme } from "./config/contactTheme";

export const appConfig = {
  title: "حنتيرة في عالم التأمين",
  company: {
    name: "Contact Insurance Brokerage",
    logoPath: "assets/brand/contact-insurance-brokerage.png",
    tagline: "Stay secured, live insured.",
    serviceLine:
      "نفهم نشاطك، نحدد المخاطر، نقارن عروض السوق، نرتب التغطية، ونتابع الوثائق والـ Claims والـ Renewal.",
    metrics: [
      { value: "11+", label: "Years of Experience", detail: "Since 2015 in the Egyptian market" },
      { value: "40K+", label: "Clients Annually", detail: "Individuals and Companies" },
      { value: "#5", label: "Ranking", detail: "Among 120 brokerage companies" }
    ],
    audiences: ["أفراد", "شركات", "SMEs", "شراكات سيارات"],
    retailProducts: ["Medical", "Life", "Personal Accident", "Home", "Car", "SMEs"],
    disclaimer: "All coverages are issued by insurance companies licensed by the Financial Regulatory Authority."
  },
  theme: {
    accent: contactTheme.colors.orange,
    ink: contactTheme.colors.ink,
    paper: contactTheme.colors.paper
  },
  currency: "EGP",
  examples: {
    crashInvoice: 350000
  },
  room: {
    defaultCode: "7284",
    allowLateJoins: true,
    allowVoteChangeDefault: false
  },
  sound: {
    enabled: true,
    placeholderOnly: true
  }
};
