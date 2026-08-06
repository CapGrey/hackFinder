import { useState } from "react";
import { AttributeStat } from "@backend/enums/AttributeStat";
import { VitalPoolStat } from "@backend/enums/VitalPoolStat";
import { Attributes } from "@backend/model/Attributes";
import { VitalPools } from "@backend/model/VitalPools";
import { PC } from "@backend/model/PC";

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

function createDefaultPc(): PC {
  return new PC(
    "pc-1",
    "Hero",
    new Attributes(2, 2, 1, 1),
    new VitalPools(20, 10, 10, 6, 4),
  );
}

export function PcSheet() {
  const [pc, setPc] = useState(() => createDefaultPc());
  const [, bump] = useState(0);
  const refresh = () => bump((n) => n + 1);

  const [occupyTicks, setOccupyTicks] = useState(2);
  const [occupyLabel, setOccupyLabel] = useState("Stance");

  const reset = () => {
    setPc(createDefaultPc());
  };

  return (
    <div className="sheet">
      <section className="panel">
        <h2 className="panel__title">Identity</h2>
        <label className="field">
          <span>Name</span>
          <input
            value={pc.name}
            onChange={(e) => {
              pc.name = e.target.value;
              refresh();
            }}
          />
        </label>
        <label className="check">
          <input
            type="checkbox"
            checked={pc.actedThisRound}
            onChange={(e) => {
              pc.actedThisRound = e.target.checked;
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
              <strong>{pc.attributes.getStat(stat)}</strong>
              <div className="stat-row__actions">
                <button
                  type="button"
                  className="btn btn--tiny"
                  onClick={() => {
                    pc.attributes.addToStat(stat, 1);
                    refresh();
                  }}
                >
                  +
                </button>
                <button
                  type="button"
                  className="btn btn--tiny"
                  onClick={() => {
                    pc.attributes.subtractFromStat(stat, 1);
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
              <strong>{pc.vitals.getStat(stat)}</strong>
              <div className="stat-row__actions">
                <button
                  type="button"
                  className="btn btn--tiny"
                  onClick={() => {
                    pc.vitals.restoreStat(stat, 1);
                    refresh();
                  }}
                >
                  +
                </button>
                <button
                  type="button"
                  className="btn btn--tiny"
                  onClick={() => {
                    pc.vitals.reduceStat(stat, 1);
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
        <h2 className="panel__title">Action Clocks</h2>
        <div className="clock-controls">
          <label className="field field--inline">
            <span>Ticks</span>
            <input
              type="number"
              min={0}
              value={occupyTicks}
              onChange={(e) => setOccupyTicks(Number(e.target.value) || 0)}
            />
          </label>
          <label className="field field--inline">
            <span>Label</span>
            <input
              value={occupyLabel}
              onChange={(e) => setOccupyLabel(e.target.value)}
            />
          </label>
          <button
            type="button"
            className="btn"
            onClick={() => {
              pc.tickAllClocks();
              refresh();
            }}
          >
            Tick all
          </button>
        </div>
        <ul className="clock-list">
          {pc.clocks.map((clock, index) => (
            <li key={index} className="clock-card">
              <div className="clock-card__meta">
                <strong>Clock {index + 1}</strong>
                <span>{clock.isOccupied() ? "Occupied" : "Open"}</span>
              </div>
              <p className="clock-card__ticks">
                {clock.remainingTicks} tick{clock.remainingTicks === 1 ? "" : "s"}
                {clock.label ? ` — ${clock.label}` : ""}
              </p>
              <div className="actions">
                <button
                  type="button"
                  className="btn btn--accent"
                  onClick={() => {
                    clock.occupy(occupyTicks, occupyLabel || null);
                    refresh();
                  }}
                >
                  Occupy
                </button>
                <button
                  type="button"
                  className="btn"
                  onClick={() => {
                    clock.tick();
                    refresh();
                  }}
                >
                  Tick
                </button>
                <button
                  type="button"
                  className="btn btn--muted"
                  onClick={() => {
                    clock.clear();
                    refresh();
                  }}
                >
                  Clear
                </button>
              </div>
            </li>
          ))}
        </ul>
      </section>

      <div className="actions">
        <button type="button" className="btn btn--muted" onClick={reset}>
          Reset PC
        </button>
      </div>
    </div>
  );
}
