import { VitalPoolStat } from "../enums/VitalPoolStat";

export class VitalPools {
  hitPoints: number;
  endurancePoints: number;
  sanityPoints: number;
  staminaPoints: number;
  manaPoints: number;

  constructor(
    hitPoints = 0,
    endurancePoints = 0,
    sanityPoints = 0,
    staminaPoints = 0,
    manaPoints = 0,
  ) {
    this.hitPoints = hitPoints;
    this.endurancePoints = endurancePoints;
    this.sanityPoints = sanityPoints;
    this.staminaPoints = staminaPoints;
    this.manaPoints = manaPoints;
  }

  getStat(stat: VitalPoolStat): number {
    switch (stat) {
      case VitalPoolStat.HitPoints:
        return this.hitPoints;
      case VitalPoolStat.EndurancePoints:
        return this.endurancePoints;
      case VitalPoolStat.SanityPoints:
        return this.sanityPoints;
      case VitalPoolStat.StaminaPoints:
        return this.staminaPoints;
      case VitalPoolStat.ManaPoints:
        return this.manaPoints;
    }
  }

  setStat(stat: VitalPoolStat, value: number): void {
    switch (stat) {
      case VitalPoolStat.HitPoints:
        this.hitPoints = value;
        break;
      case VitalPoolStat.EndurancePoints:
        this.endurancePoints = value;
        break;
      case VitalPoolStat.SanityPoints:
        this.sanityPoints = value;
        break;
      case VitalPoolStat.StaminaPoints:
        this.staminaPoints = value;
        break;
      case VitalPoolStat.ManaPoints:
        this.manaPoints = value;
        break;
    }
  }

  reduceStat(stat: VitalPoolStat, amount: number): void {
    this.setStat(stat, this.getStat(stat) - amount);
  }

  restoreStat(stat: VitalPoolStat, amount: number): void {
    this.setStat(stat, this.getStat(stat) + amount);
  }
}
