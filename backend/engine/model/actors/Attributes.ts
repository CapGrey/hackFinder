import { AttributeStat } from "../../enums/AttributeStat";

export class Attributes {
  might: number;
  agility: number;
  mind: number;
  spirit: number;

  constructor(might = 0, agility = 0, mind = 0, spirit = 0) {
    this.might = might;
    this.agility = agility;
    this.mind = mind;
    this.spirit = spirit;
  }

  getStat(attr: AttributeStat): number {
    switch (attr) {
      case AttributeStat.Might:
        return this.might;
      case AttributeStat.Agility:
        return this.agility;
      case AttributeStat.Mind:
        return this.mind;
      case AttributeStat.Spirit:
        return this.spirit;
    }
  }

  setStat(attr: AttributeStat, value: number): void {
    switch (attr) {
      case AttributeStat.Might:
        this.might = value;
        break;
      case AttributeStat.Agility:
        this.agility = value;
        break;
      case AttributeStat.Mind:
        this.mind = value;
        break;
      case AttributeStat.Spirit:
        this.spirit = value;
        break;
    }
  }

  addToStat(attr: AttributeStat, value: number): void {
    this.setStat(attr, this.getStat(attr) + value);
  }

  subtractFromStat(attr: AttributeStat, value: number): void {
    this.setStat(attr, this.getStat(attr) - value);
  }
}
