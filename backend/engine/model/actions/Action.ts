import type { PhaseTrait } from "../../enums/PhaseTrait";
import type { ActionCostTier } from "../../enums/ActionCostTier";
import type { DurationType } from "../../enums/DurationType";
import type { Tag } from "../../enums/Tag";
import type { ResourceCost } from "../../valueObjects/ResourceCost";
import type { ShapeTemplate } from "../grid/shapes/ShapeTemplate";
import type { ActionContext } from "./ActionContext";
import type { ActionResult } from "./ActionResult";

export class Action {
  id!: string;
  name!: string;
  phaseTrait!: PhaseTrait;
  costTier!: ActionCostTier;
  resourceCost!: ResourceCost;
  occupancyTicks!: number;
  duration!: DurationType;
  tags!: Tag[];
  targetShape!: ShapeTemplate;

  execute(_context: ActionContext): ActionResult {
    return {} as ActionResult;
  }
}
