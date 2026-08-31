import { describe, expect, it } from "vitest";
import { appConfig } from "./config";
import { contactTheme } from "./config/contactTheme";

describe("Contact configuration", () => {
  it("uses Contact Insurance Brokerage as the configured company without inventing facts", () => {
    expect(appConfig.company.name).toBe("Contact Insurance Brokerage");
    expect(appConfig.company.metrics.map((metric) => metric.value)).toEqual(["11+", "40K+", "#5"]);
    expect(appConfig.company.disclaimer).toContain("Financial Regulatory Authority");
  });

  it("exposes sampled Contact logo colors as centralized tokens", () => {
    expect(contactTheme.colors.yellow).toBe("#FDDE20");
    expect(contactTheme.colors.orange).toBe("#F4821F");
    expect(contactTheme.colors.amber).toBe("#F9BB33");
  });
});
