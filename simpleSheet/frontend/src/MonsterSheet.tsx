import { useState } from "react";
import { AttributeStat } from "@backend/enums/AttributeStat";
import { VitalPoolStat } from "@backend/enums/VitalPoolStat";
import { ActionCostTier } from "@backend/enums/ActionCostTier";
import { Attributes } from "@backend/model/Attributes";
import { VitalPools } from "@backend/model/VitalPools";
import { Monster } from "@backend/model/Monster";
import { MonsterPacing } from "@backend/model/MonsterPacing";

const ATTRS = [
  AttributeStat.Might,
  AttributeStat.Agility,
  AttributeStat.Mind,
  AttributeStat.Spirit,
] as const;

const VITALS = [
  { stat: VitalPoolStat.HitPoints, label: "HP" },
  { stat: VitalPoolStat.EndurancePoints, label: "EP" },
  { stat: VitalPoolStat.SanityPoints, label: "SP" },
  { stat: VitalPoolStat.StaminaPoints, label: "Stamina" },
  { stat: VitalPoolStat.ManaPoints, label: "Mana" },
] as const;

const BUDGET_TIERS = [
  ActionCostTier.Light,
  ActionCostTier.Moderate,
  ActionCostTier.Heavy,
] as const;

function createDefaultMonster(): Monster {
  return new Monster(
    "monster-1",
    "Goblin",
    new Attributes(1, 2, 0, 0),
    new VitalPools(8, 4, 0, 2, 0),
    false,
    new MonsterPacing(ActionCostTier.Light, false),
  );
}

export function MonsterSheet() {
  const [monster, setMonster] = useState(() => createDefaultMonster());
  const [, bump] = useState(0);
  const refresh = () => bump((n) => n + 1);

  const [checkTier, setCheckTier] = useState<ActionCostTier>(ActionCostTier.Light);

  const reset = () => {
    setMonster(createDefaultMonster());
  };

  return (
    <div className="sheet">
      <section className="panel">
        <h2 className="panel__title">Identity</h2>
        <label className="field">
          <span>Name</span>
          <input
            value={monster.name}
            onChange={(e) => {
              monster.name = e.target.value;
              refresh();
            }}
          />
        </label>
        <label className="check">
          <input
            type="checkbox"
            checked={monster.isElite}
            onChange={(e) => {
              monster.isElite = e.target.checked;
              refresh();
            }}
          />
          Elite
        </label>
        <label className="check">
          <input
            type="checkbox"
            checked={monster.actedThisRound}
            onChange={(e) => {
              monster.actedThisRound = e.target.checked;
              refresh();
            }}
          />
          Acted this round
        </label>
      </section>

      <section className="panel">
        <h2 className="panel__title">Attributes</h2>
        <ul className="stat-list">
          {ATTRS.map((stat) => (
            <li key={stat} className="stat-row">
              <span>{stat}</span>
              <strong>{monster.attributes.getStat(stat)}</strong>
              <div className="stat-row__actions">
                <button
                  type="button"
                  className="btn btn--tiny"
                  onClick={() => {
                    monster.attributes.addToStat(stat, 1);
                    refresh();
                  }}
                >
                  +
                </button>
                <button
                  type="button"
                  className="btn btn--tiny"
                  onClick={() => {
                    monster.attributes.subtractFromStat(stat, 1);
                    refresh();
                  }}
                >
                  −
                </button>
              </div>
            </li>
          ))}
        </ul>
      </section>

      <section className="panel">
        <h2 className="panel__title">Vitals</h2>
        <ul className="stat-list">
          {VITALS.map(({ stat, label }) => (
            <li key={stat} className="stat-row">
              <span>{label}</span>
              <strong>{monster.vitals.getStat(stat)}</strong>
              <div className="stat-row__actions">
                <button
                  type="button"
                  className="btn btn--tiny"
                  onClick={() => {
                    monster.vitals.restoreStat(stat, 1);
                    refresh();
                  }}
                >
                  +
                </button>
                <button
                  type="button"
                  className="btn btn--tiny"
                  onClick={() => {
                    monster.vitals.reduceStat(stat, 1);
                    refresh();
                  }}
                >
                  −
                </button>
              </div>
            </li>
          ))}
        </ul>
      </section>

      <section className="panel">
        <h2 className="panel__title">Period Pacing</h2>
        <dl className="meta">
          <dt>Budget tier</dt>
          <dd>{monster.pacing.budgetTierThisPeriod ?? "None"}</dd>
          <dt>Budget used</dt>
          <dd>{String(monster.pacing.hasUsedBudgetActionThisPeriod)}</dd>
        </dl>

        <div className="actions">
          {BUDGET_TIERS.map((tier) => (
            <button
              key={tier}
              type="button"
              className="btn"
              onClick={() => {
                monster.pacing.resetForNewPeriod(tier);
                refresh();
              }}
            >
              Set {tier}
            </button>
          ))}
        </div>

        <div className="actions" style={{ marginTop: "0.75rem" }}>
          <button
            type="button"
            className="btn btn--accent"
            onClick={() => {
              monster.pacing.markBudgetActionUsed();
              refresh();
            }}
          >
            Mark budget used
          </button>
          <button
            type="button"
            className="btn btn--muted"
            onClick={() => {
              monster.pacing.resetForNewPeriod(monster.pacing.budgetTierThisPeriod);
              refresh();
            }}
          >
            Reset period (keep tier)
          </button>
        </div>

        <div className="clock-controls" style={{ marginTop: "1rem" }}>
          <label className="field field--inline">
            <span>Check tier</span>
            <select
              value={checkTier}
              onChange={(e) => setCheckTier(e.target.value as ActionCostTier)}
            >
              {Object.values(ActionCostTier).map((tier) => (
                <option key={tier} value={tier}>
                  {tier}
                </option>
              ))}
            </select>
          </label>
          <p className="status-inline">
            canUseBudgetAction({checkTier}) →{" "}
            <strong>{String(monster.pacing.canUseBudgetAction(checkTier))}</strong>
          </p>
        </div>
      </section>

      <div className="actions">
        <button type="button" className="btn btn--muted" onClick={reset}>
          Reset Monster
        </button>
      </div>
    </div>
  );
}
