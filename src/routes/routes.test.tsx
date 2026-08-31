import { beforeEach, describe, expect, it } from "vitest";
import { fireEvent, render, screen, waitFor } from "@testing-library/react";
import { PresentRoute } from "./PresentRoute";
import { JoinRoute } from "./JoinRoute";
import { ControlRoute } from "./ControlRoute";
import { appConfig } from "../config";
import { scenes } from "../data/scenes";
import { makeRoom } from "../lib/roomState";
import { saveStoredSession } from "../lib/session";

beforeEach(() => {
  localStorage.clear();
});

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

  it("confirms submitted multi-select votes on the audience phone", async () => {
    const room = {
      ...makeRoom("7284"),
      current_scene: scenes.findIndex((scene) => scene.id === "build-protection"),
      current_beat: scenes.find((scene) => scene.id === "build-protection")?.beats.findIndex((beat) => beat.id === "vote") ?? 1,
      voting_open: true,
      active_interaction: "build-protection",
      status: "live" as const
    };
    localStorage.setItem("hantira-local-room", JSON.stringify({ room, participants: [], votes: [] }));
    saveStoredSession({ participantSessionId: "participant-qa", roomCode: "7284", nickname: "محمد QA", votes: {} });

    render(<JoinRoute roomCode="7284" />);

    fireEvent.click(screen.getByRole("button", { name: "Motor" }));
    fireEvent.click(screen.getByRole("button", { name: "Property" }));
    fireEvent.click(screen.getByRole("button", { name: "سجل اختياري (2)" }));

    await waitFor(() => expect(screen.getByText("تم تسجيل اختياراتك ✅")).toBeTruthy());
  });
});
