import { Actor } from "@engine/model/actors/Actor";
import type { Action } from "@engine/model/actions/Action";
import type { Effect } from "@engine/model/effects/Effect";
import { Attributes } from "@engine/model/actors/Attributes";
import { VitalPools } from "@engine/model/actors/VitalPools";
import { Action as ActionClass } from "@engine/model/actions/Action";
import type { ResourceCost } from "@engine/valueObjects/ResourceCost";

/** Harness-only concrete Actor with visible method side effects. */
export class TestActor extends Actor {
  takeAction(_action: Action): void {
    this.actedThisRound = true;
  }

  canAfford(_cost: ResourceCost): boolean {
    return true;
  }

  applyEffect(effect: Effect): void {
    this.activeEffects.push(effect);
  }
}

export function createTestActor(): TestActor {
  const actor = new TestActor();
  actor.id = "test-1";
  actor.name = "Test Actor";
  actor.attributes = new Attributes();
  actor.vitals = new VitalPools();
  actor.knownActions = [new ActionClass()];
  actor.activeEffects = [];
  actor.actedThisRound = false;
  return actor;
}
