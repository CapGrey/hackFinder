export class ActionClock {
  remainingTicks: number;
  label: string | null;

  constructor(remainingTicks = 0, label: string | null = null) {
    this.remainingTicks = remainingTicks;
    this.label = label;
  }

  isOccupied(): boolean {
    return this.remainingTicks > 0 || this.label !== null;
  }

  occupy(ticks: number, label: string | null = null): void {
    this.remainingTicks = ticks;
    this.label = label;
  }

  clear(): void {
    this.remainingTicks = 0;
    this.label = null;
  }

  tick(): void {
    if (this.remainingTicks > 0) {
      this.remainingTicks -= 1;
      if (this.remainingTicks <= 0) {
        this.clear();
      }
    }
  }
}
