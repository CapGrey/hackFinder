import { ActionCostTier } from "../enums/ActionCostTier";

const TIER_RANK: Record<ActionCostTier, number> = {
  [ActionCostTier.AtWill]: 0,
  [ActionCostTier.Light]: 1,
  [ActionCostTier.Moderate]: 2,
  [ActionCostTier.Heavy]: 3,
};

export class MonsterPacing {
  budgetTierThisPeriod: ActionCostTier | null;
  hasUsedBudgetActionThisPeriod: boolean;

  constructor(
    budgetTierThisPeriod: ActionCostTier | null = null,
    hasUsedBudgetActionThisPeriod = false,
  ) {
    this.budgetTierThisPeriod = budgetTierThisPeriod;
    this.hasUsedBudgetActionThisPeriod = hasUsedBudgetActionThisPeriod;
  }

  canUseBudgetAction(tier: ActionCostTier): boolean {
    if (tier === ActionCostTier.AtWill) {
      return true;
    }
    if (this.hasUsedBudgetActionThisPeriod) {
      return false;
    }
    if (this.budgetTierThisPeriod === null) {
      return false;
    }
    return TIER_RANK[tier] <= TIER_RANK[this.budgetTierThisPeriod];
  }

  markBudgetActionUsed(): void {
    this.hasUsedBudgetActionThisPeriod = true;
  }

  resetForNewPeriod(tier: ActionCostTier | null): void {
    this.budgetTierThisPeriod = tier;
    this.hasUsedBudgetActionThisPeriod = false;
  }
}
