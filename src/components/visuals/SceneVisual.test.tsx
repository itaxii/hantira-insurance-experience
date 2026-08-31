import { describe, expect, it } from "vitest";
import { render } from "@testing-library/react";
import { SceneVisual, sceneVisualIds } from "./SceneVisual";

/**
 * Every registered scene visual must render real content (an SVG or a
 * composite) and never fall back to the old dashed placeholder square.
 */

describe("SceneVisual registry", () => {
  it("renders content for every registered visual id", () => {
    for (const id of sceneVisualIds) {
      const { container, unmount } = render(<SceneVisual id={id} />);
      const hasArt =
        container.querySelector("svg") !== null ||
        container.querySelector("article, ol, .term-cloud, .offer-storm, .logo-badge, .broker-slider, .value-words, .company-flow") !== null;
      expect(hasArt, `visual "${id}" rendered empty`).toBe(true);
      unmount();
    }
  });

  it("renders the typographic fallback for unknown ids instead of a dashed square", () => {
    const { container } = render(<SceneVisual id="totally-unknown" />);
    expect(container.querySelector(".scene-wordmark")).not.toBeNull();
    expect(container.querySelector(".scene-object")).toBeNull();
  });

  it("wraps flow separator arrows in svg elements instead of raw html g/path tags", () => {
    const { container } = render(<SceneVisual id="without-insurance" />);
    const separator = container.querySelector(".flow-sep");

    expect(separator?.tagName.toLowerCase()).toBe("svg");
  });
});
