import type { Attributes } from "./Attributes";
import type { VitalPools } from "./VitalPools";

export abstract class Actor {
  id: string;
  name: string;
  attributes: Attributes;
  vitals: VitalPools;
  actedThisRound: boolean;

  constructor(
    id: string,
    name: string,
    attributes: Attributes,
    vitals: VitalPools,
    actedThisRound = false,
  ) {
    this.id = id;
    this.name = name;
    this.attributes = attributes;
    this.vitals = vitals;
    this.actedThisRound = actedThisRound;
  }
}
