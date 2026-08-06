import { Actor } from "./Actor";
import { MonsterPacing } from "./MonsterPacing";
import type { Attributes } from "./Attributes";
import type { VitalPools } from "./VitalPools";

export class Monster extends Actor {
  isElite: boolean;
  pacing: MonsterPacing;

  constructor(
    id: string,
    name: string,
    attributes: Attributes,
    vitals: VitalPools,
    isElite = false,
    pacing: MonsterPacing = new MonsterPacing(),
    actedThisRound = false,
  ) {
    super(id, name, attributes, vitals, actedThisRound);
    this.isElite = isElite;
    this.pacing = pacing;
  }
}
