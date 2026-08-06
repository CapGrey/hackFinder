import type { Action } from "../actions/Action";
import type { Effect } from "../effects/Effect";
import type { ResourceCost } from "../../valueObjects/ResourceCost";
import type { Attributes } from "./Attributes";
import type { VitalPools } from "./VitalPools";

export abstract class Actor {
  id: string;
  name: string;
  attributes: Attributes;
  vitals: VitalPools;
  knownActions: Action[];
  activeEffects: Effect[];
  actedThisRound: boolean;

  constructor(id: string, name: string, attributes: Attributes, 
    vitals: VitalPools, knownActions: Action[], 
    activeEffects: Effect[], actedThisRound: boolean) {
    this.id = id;
    this.name = name;
    this.attributes = attributes;
    this.vitals = vitals;
    this.knownActions = knownActions;
    this.activeEffects = activeEffects;
    this.actedThisRound = actedThisRound;
  }

  takeAction(_action: Action): void {}

  canAfford(_cost: ResourceCost): boolean {
    return false;
  }

  applyEffect(_effect: Effect): void {}
}
