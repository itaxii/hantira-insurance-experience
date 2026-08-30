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
    const oscillator = this.context.createOscillator();
    const gain = this.context.createGain();
    const freq = name === "crash" ? 80 : name === "correct" ? 640 : name === "wrong" ? 160 : 320;
    oscillator.frequency.value = freq;
    gain.gain.value = 0.03;
    oscillator.connect(gain);
    gain.connect(this.context.destination);
    oscillator.start();
    oscillator.stop(this.context.currentTime + 0.12);
  }
}

export const soundManager = new SoundManager();
