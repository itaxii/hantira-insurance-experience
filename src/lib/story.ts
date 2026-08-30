import type { Scene, StoryPosition } from "../types";

export function clampPosition(scenes: Scene[], position: StoryPosition): StoryPosition {
  const sceneIndex = Math.min(Math.max(position.sceneIndex, 0), scenes.length - 1);
  const beatCount = scenes[sceneIndex]?.beats.length ?? 1;
  return { sceneIndex, beatIndex: Math.min(Math.max(position.beatIndex, 0), beatCount - 1) };
}

export function moveBeat(scenes: Scene[], position: StoryPosition, direction: "next" | "previous"): StoryPosition {
  const current = clampPosition(scenes, position);
  if (direction === "next") {
    if (current.beatIndex < scenes[current.sceneIndex].beats.length - 1) {
      return { ...current, beatIndex: current.beatIndex + 1 };
    }
    return clampPosition(scenes, { sceneIndex: current.sceneIndex + 1, beatIndex: 0 });
  }

  if (current.beatIndex > 0) return { ...current, beatIndex: current.beatIndex - 1 };
  const previousScene = Math.max(current.sceneIndex - 1, 0);
  return { sceneIndex: previousScene, beatIndex: Math.max((scenes[previousScene]?.beats.length ?? 1) - 1, 0) };
}

export function getActiveScene(scenes: Scene[], position: StoryPosition) {
  return scenes[clampPosition(scenes, position).sceneIndex];
}

export function getActiveBeat(scenes: Scene[], position: StoryPosition) {
  const clean = clampPosition(scenes, position);
  return scenes[clean.sceneIndex]?.beats[clean.beatIndex];
}

export function sceneHasJoinQr(scene: Scene) {
  return scene.kind === "join" && scene.onceOnlyQr === true;
}
