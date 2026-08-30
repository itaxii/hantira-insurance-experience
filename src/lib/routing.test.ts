import { describe, expect, it } from "vitest";
import { normalizeAppPath } from "./routing";

describe("routing helpers", () => {
  it("normalizes GitHub Pages project paths to app routes", () => {
    expect(normalizeAppPath("/hantira-insurance-experience/control")).toBe("/control");
    expect(normalizeAppPath("/hantira-insurance-experience/join/7284")).toBe("/join/7284");
  });

  it("keeps root-hosted routes unchanged", () => {
    expect(normalizeAppPath("/present")).toBe("/present");
  });
});
