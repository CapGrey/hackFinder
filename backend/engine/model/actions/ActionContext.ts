import type { Actor } from "../actors/Actor";
import type { GridMap } from "../grid/GridMap";
import type {CombatPhase} from "../../phases/CombatPhase";

export class ActionContext {
  actingActor: Actor;
  targets: Actor[];
  grid: GridMap;
  phase: CombatPhase;
  round: number;

  constructor(actingActor: Actor, targets: Actor[], grid: GridMap, 
    phase: CombatPhase, round: number) {
    this.actingActor = actingActor;
    this.targets = targets;
    this.grid = grid;
    this.phase = phase;
    this.round = round;
  }
}