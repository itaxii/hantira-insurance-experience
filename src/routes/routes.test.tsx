import { describe, expect, it } from "vitest";
import { fireEvent, render, screen, waitFor } from "@testing-library/react";
import { PresentRoute } from "./PresentRoute";
import { JoinRoute } from "./JoinRoute";
import { ControlRoute } from "./ControlRoute";
import { appConfig } from "../config";

describe("route smoke (local rehearsal mode)", () => {
  it("starts on the one-time QR join scene, then advances beats with the keyboard", async () => {
    render(<PresentRoute />);
    expect(screen.getByText(appConfig.title)).toBeTruthy();

    fireEvent.click(screen.getByRole("button", { name: "Start Experience" }));

    await waitFor(() => expect(screen.getByText("امسح الـ QR مرة واحدة وخليك معانا لحد نهاية الرحلة.")).toBeTruthy());
    expect(document.querySelector(".qr-wrap svg")).not.toBeNull();

    fireEvent.keyDown(window, { key: "ArrowRight" });
    await waitFor(() => expect(screen.getAllByText("حنتيرة عنده حق؟").length).toBeGreaterThan(0));

    fireEvent.keyDown(window, { key: "ArrowLeft" });
    await waitFor(() => expect(document.querySelector(".qr-wrap svg")).not.toBeNull());
  });

  it("renders the join route nickname screen for a room", () => {
    render(<JoinRoute roomCode="7284" />);
    expect(screen.getByText("أهلاً بيك في رحلة حنتيرة")).toBeTruthy();
    expect(screen.getByRole("button", { name: "ادخل الرحلة" })).toBeTruthy();
  });

  it("renders the control route in local rehearsal mode (login gate only with Supabase config)", () => {
    render(<ControlRoute />);
    expect(screen.getByText("Room")).toBeTruthy();
    expect(screen.getByText("Story")).toBeTruthy();
  });
});
