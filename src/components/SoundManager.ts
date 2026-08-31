export type SoundCue = "step" | "engine" | "crash" | "alarm" | "thud" | "paper" | "correct" | "wrong" | "ding";

type CueSpec = { freq: number; type: OscillatorType; duration: number; gain?: number; sweepTo?: number };

const cues: Record<SoundCue, CueSpec> = {
  step: { freq: 90, type: "triangle", duration: 0.09, gain: 0.02 },
  engine: { freq: 70, type: "sawtooth", duration: 0.5, gain: 0.015, sweepTo: 110 },
  crash: { freq: 120, type: "square", duration: 0.4, gain: 0.05, sweepTo: 40 },
  alarm: { freq: 880, type: "square", duration: 0.22, gain: 0.03, sweepTo: 620 },
  thud: { freq: 60, type: "sine", duration: 0.3, gain: 0.05, sweepTo: 45 },
  paper: { freq: 320, type: "triangle", duration: 0.16, gain: 0.02, sweepTo: 210 },
  correct: { freq: 620, type: "sine", duration: 0.18, gain: 0.035 },
  wrong: { freq: 180, type: "square", duration: 0.22, gain: 0.03 },
  ding: { freq: 760, type: "sine", duration: 0.2, gain: 0.03 }
};

export class SoundManager {
  private muted = true;
  private context: AudioContext | null = null;

  setMuted(muted: boolean) {
    this.muted = muted;
  }

  async unlock() {
    if (!this.context) this.context = new AudioContext();
    if (this.context.state === "suspended") await this.context.resume();
  }

  play(name: string) {
    if (this.muted || !this.context) return;
    const spec = cues[name as SoundCue] ?? cues.ding;
    const oscillator = this.context.createOscillator();
    const gain = this.context.createGain();
    const now = this.context.currentTime;
    oscillator.type = spec.type;
    oscillator.frequency.setValueAtTime(spec.freq, now);
    if (spec.sweepTo) oscillator.frequency.exponentialRampToValueAtTime(spec.sweepTo, now + spec.duration);
    gain.gain.setValueAtTime(spec.gain ?? 0.03, now);
    gain.gain.exponentialRampToValueAtTime(0.0001, now + spec.duration);
    oscillator.connect(gain);
    gain.connect(this.context.destination);
    oscillator.start(now);
    oscillator.stop(now + spec.duration);
  }
}

export const soundManager = new SoundManager();
