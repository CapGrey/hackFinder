import { VitalPoolStat } from "../../enums/vitalPoolStat";

export class VitalPools {
    hitPoints: number;
    endurancePoints: number;
    sanityPoints: number;
    staminaPoints: number;
    manaPoints: number;


    constructor(hitPoints = 0, endurancePoints = 0, sanityPoints = 0, 
        staminaPoints = 0, manaPoints = 0) {
        this.hitPoints = hitPoints;
        this.endurancePoints = endurancePoints;
        this.sanityPoints = sanityPoints;
        this.staminaPoints = staminaPoints;
        this.manaPoints = manaPoints;
    }

    reduceStat(stat: VitalPoolStat, amount: number): void {
        switch (stat) {
            case VitalPoolStat.HitPoints:
                this.hitPoints -= amount;
                break;
            case VitalPoolStat.EndurancePoints:
                this.endurancePoints -= amount;
                break;
            case VitalPoolStat.SanityPoints:
                this.sanityPoints -= amount;
                break;
            case VitalPoolStat.StaminaPoints:
                this.staminaPoints -= amount;
                break;
            case VitalPoolStat.ManaPoints:
                this.manaPoints -= amount;
                break;
        }
    }

    restoreStat(stat: VitalPoolStat, amount: number): void {
        switch (stat) {
            case VitalPoolStat.HitPoints:
                this.hitPoints += amount;
                break;
            case VitalPoolStat.EndurancePoints:
                this.endurancePoints += amount;
                break;
            case VitalPoolStat.SanityPoints:
                this.sanityPoints += amount;
                break;
            case VitalPoolStat.StaminaPoints:
                this.staminaPoints += amount;
                break;
            case VitalPoolStat.ManaPoints:
                this.manaPoints += amount;
                break;
        }
    }
}
