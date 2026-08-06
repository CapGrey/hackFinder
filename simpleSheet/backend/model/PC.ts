import { Actor } from "./Actor";
import { ActionClock } from "./ActionClock";
import type { Attributes } from "./Attributes";
import type { VitalPools } from "./VitalPools";

export class PC extends Actor {
  clocks: ActionClock[];

  constructor(
    id: string,
    name: string,
    attributes: Attributes,
    vitals: VitalPools,
    clockCount = 2,
    actedThisRound = false,
  ) {
    super(id, name, attributes, vitals, actedThisRound);
    this.clocks = Array.from({ length: clockCount }, () => new ActionClock());
  }

  tickAllClocks(): void {
    for (const clock of this.clocks) {
      clock.tick();
    }
  }
}
