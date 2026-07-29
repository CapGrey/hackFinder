import type { Action } from "../actions/Action";
import type { Effect } from "../effects/Effect";
import type { ResourceCost } from "../../valueObjects/ResourceCost";
import type { Attributes } from "./Attributes";
import type { VitalPools } from "./VitalPools";

export abstract class Actor {
  id!: string;
  name!: string;
  attributes!: Attributes;
  vitals!: VitalPools;
  knownActions!: Action[];
  activeEffects!: Effect[];
  actedThisRound!: boolean;

  takeAction(_action: Action): void {}

  canAfford(_cost: ResourceCost): boolean {
    return false;
  }

  applyEffect(_effect: Effect): void {}
}
