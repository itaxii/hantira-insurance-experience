import { describe, expect, it } from "vitest";
import { consumeRedirectPath, normalizeAppPath } from "./routing";

describe("routing helpers", () => {
  it("normalizes GitHub Pages project paths to app routes", () => {
    expect(normalizeAppPath("/hantira-insurance-experience/control")).toBe("/control");
    expect(normalizeAppPath("/hantira-insurance-experience/join/7284")).toBe("/join/7284");
  });

  it("keeps root-hosted routes unchanged", () => {
    expect(normalizeAppPath("/present")).toBe("/present");
  });

  it("consumes GitHub Pages redirect handoff once", () => {
    const storage = window.sessionStorage;
    storage.setItem("redirect", "/hantira-insurance-experience/join/7284?x=1#top");

    expect(consumeRedirectPath(storage)).toBe("/join/7284");
    expect(storage.getItem("redirect")).toBeNull();
    expect(consumeRedirectPath(storage)).toBeNull();
  });
});
