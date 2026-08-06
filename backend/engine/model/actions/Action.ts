import type { PhaseTrait } from "../../enums/PhaseTrait";
import type { ActionCostTier } from "../../enums/ActionCostTier";
import type { DurationType } from "../../enums/DurationType";
import type { Tag } from "../../enums/Tag";
import type { ResourceCost } from "../../valueObjects/ResourceCost";
import type { ShapeTemplate } from "../grid/shapes/ShapeTemplate";
import type { ActionContext } from "./ActionContext";
import type { ActionResult } from "./ActionResult";

export class Action {
  id: string;
  name: string;
  phaseTrait: PhaseTrait;
  costTier: ActionCostTier;
  resourceCost: ResourceCost;
  occupancyTicks: number;
  duration: DurationType;
  tags: Tag[];
  targetShape: ShapeTemplate;

  constructor(id: string, name: string, phaseTrait: PhaseTrait, 
    costTier: ActionCostTier, resourceCost: ResourceCost, 
    occupancyTicks: number, duration: DurationType, tags: Tag[], 
    targetShape: ShapeTemplate) {
    this.id = id;
    this.name = name;
    this.phaseTrait = phaseTrait;
    this.costTier = costTier;
    this.resourceCost = resourceCost;
    this.occupancyTicks = occupancyTicks;
    this.duration = duration;
    this.tags = tags;
    this.targetShape = targetShape;
  }

  execute(_context: ActionContext): ActionResult {
    return {} as ActionResult;
  }
}
