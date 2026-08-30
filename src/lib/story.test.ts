import { describe, expect, it } from "vitest";
import { getActiveBeat, moveBeat, sceneHasJoinQr } from "./story";
import { scenes } from "../data/scenes";

describe("story engine", () => {
  it("moves one beat at a time instead of skipping a scene on next", () => {
    const firstScene = scenes[0];
    expect(firstScene.beats.length).toBeGreaterThan(2);
    const next = moveBeat(scenes, { sceneIndex: 0, beatIndex: 0 }, "next");
    expect(next).toEqual({ sceneIndex: 0, beatIndex: 1 });
  });

  it("moves to the first beat of the next scene only after the current scene is exhausted", () => {
    const current = { sceneIndex: 0, beatIndex: scenes[0].beats.length - 1 };
    expect(moveBeat(scenes, current, "next")).toEqual({ sceneIndex: 1, beatIndex: 0 });
  });

  it("contains exactly one automatic QR join scene", () => {
    expect(scenes.filter(sceneHasJoinQr).map((scene) => scene.id)).toEqual(["join-once"]);
  });

  it("returns the beat content for a valid scene and beat index", () => {
    expect(getActiveBeat(scenes, { sceneIndex: 0, beatIndex: 0 })?.headline).toBe("ده حنتيرة.");
  });
});
