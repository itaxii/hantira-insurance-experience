import { describe, expect, it } from "vitest";
import { interactions, scenes } from "./scenes";
import { sceneVisualIds } from "../components/visuals/SceneVisual";

/**
 * Guards the complete 32-step story so no scene/beat can silently disappear,
 * and guards every beat visual id against the registry so the dashed
 * "scene-object placeholder" class of bug can never return.
 */

const requiredSceneIds = [
  "meet-hantira",
  "join-once",
  "hantira-opinion",
  "nice-morning",
  "who-pays",
  "what-is-risk",
  "insurance-30",
  "shopping",
  "choose-offer",
  "broker-challenge-1",
  "complexity",
  "meet-faheem",
  "broker-does",
  "hantira-logistics",
  "build-protection",
  "six-months",
  "claim-challenge",
  "claims-journey",
  "claims-chaos",
  "insurance-value",
  "broker-value",
  "with-without",
  "final-understanding",
  "our-company",
  "final-hantira",
  "ending"
];

const requiredInteractionIds = [
  "hantira-opinion",
  "who-pays",
  "broker-challenge-1",
  "build-protection",
  "claim-challenge",
  "final-understanding"
];

describe("story completeness", () => {
  it("contains every required scene in order", () => {
    expect(scenes.map((scene) => scene.id)).toEqual(requiredSceneIds);
  });

  it("contains every required interaction with its answer", () => {
    expect(interactions.map((interaction) => interaction.id)).toEqual(requiredInteractionIds);
    expect(interactions.map((interaction) => interaction.correctAnswer ?? null)).toEqual([
      null,
      "d",
      "more-info",
      null,
      "b",
      "both"
    ]);
  });

  it("gives every beat meaningful content (text or a registered visual)", () => {
    const registered = new Set(sceneVisualIds);
    for (const scene of scenes) {
      expect(scene.beats.length, `scene ${scene.id}`).toBeGreaterThan(0);
      for (const beat of scene.beats) {
        const hasText = [beat.headline, beat.body, beat.dialogue, beat.kicker].some(
          (value) => typeof value === "string" && value.trim().length > 0
        );
        const hasRegisteredVisual = typeof beat.visual === "string" && beat.visual !== "qr" && registered.has(beat.visual);
        expect(hasText || hasRegisteredVisual, `beat ${scene.id}/${beat.id}`).toBe(true);
      }
    }
  });

  it("attributes every dialogue line to a speaker", () => {
    for (const scene of scenes) {
      for (const beat of scene.beats) {
        if (beat.dialogue) expect(["hantira", "faheem"], `${scene.id}/${beat.id}`).toContain(beat.speaker ?? "hantira");
      }
    }
  });

  it("keeps the required script beats", () => {
    const allBeats = scenes.flatMap((scene) => scene.beats);
    const dialogues = allBeats.map((beat) => beat.dialogue ?? "").join("\n");
    const headlines = allBeats.map((beat) => beat.headline ?? "").join("\n");
    expect(dialogues).toContain("المشكلة مش إن الحاجة ممكن تحصل...");
    expect(dialogues).toContain("المشكلة إنها تحصل وأنا مش مستعد لها.");
    expect(dialogues).toContain("أنا مش بشتري حادث...");
    expect(dialogues).toContain("أنا كنت هلبس.");
    expect(dialogues).toContain("ولا واحدة.");
    expect(dialogues).toContain("أنا كنت فاكر إني محتاج وثيقة.");
    expect(dialogues).toContain("إنت محتاج برنامج حماية مناسب لنشاطك.");
    expect(dialogues).toContain("دوري مش بينتهي لما الوثيقة تتصدر.");
    expect(dialogues).toContain("الـ Premium ينفع يتقسط؟");
    expect(headlines).toContain("BAAAAM");
    expect(headlines).toContain("فهيم!!!");
    expect(headlines).toContain("One Point of Coordination");
    expect(headlines).toContain("طب لو بكرة حصل حاجة؟");
    expect(headlines).toContain("You can't predict every risk.");
  });
});

describe("visual registry guard", () => {
  it("resolves every beat visual id in the registry (no placeholder squares)", () => {
    const used = new Set(
      scenes
        .flatMap((scene) => scene.beats.map((beat) => beat.visual).filter(Boolean) as string[])
        .filter((id) => id !== "qr")
    );
    const registered = new Set(sceneVisualIds);
    const unresolved = [...used].filter((id) => !registered.has(id));
    expect(unresolved, "visual ids missing from the registry").toEqual([]);
  });

  it("keeps the QR visual handled by the join scene, not the registry", () => {
    expect(scenes.find((scene) => scene.onceOnlyQr)?.beats.every((beat) => beat.visual === "qr")).toBe(true);
    expect(sceneVisualIds).not.toContain("qr");
  });
});
