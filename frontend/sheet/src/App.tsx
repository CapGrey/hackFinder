import { useEffect, useState } from "react";
import { Action } from "@engine/model/actions/Action";
import { Effect } from "@engine/model/effects/Effect";
import { ResourceCost } from "@engine/valueObjects/ResourceCost";
import { AttributeStat } from "@engine/enums/AttributeStat";
import { VitalPoolStat } from "@engine/enums/vitalPoolStat";
import { createTestActor, type TestActor } from "./TestActor";
import "./App.css";

const STATS = [
  AttributeStat.Might,
  AttributeStat.Agility,
  AttributeStat.Mind,
  AttributeStat.Spirit,
] as const;

export function App() {
  const [actor, setActor] = useState<TestActor>(() => createTestActor());
  const [status, setStatus] = useState("Ready.");
  const [statusKey, setStatusKey] = useState(0);
  const [flashStat, setFlashStat] = useState<AttributeStat | null>(null);
  const [, bump] = useState(0);
  const refresh = () => bump((n) => n + 1);

  const note = (message: string) => {
    setStatus(message);
    setStatusKey((k) => k + 1);
  };

  useEffect(() => {
    if (!flashStat) return;
    const id = window.setTimeout(() => setFlashStat(null), 220);
    return () => window.clearTimeout(id);
  }, [flashStat]);

  const onTakeAction = () => {
    actor.takeAction(new Action());
    note("takeAction() — actedThisRound set true.");
    refresh();
  };

  const onCanAfford = () => {
    const resourceCost: ResourceCost = [VitalPoolStat.StaminaPoints] ;
    const result = actor.canAfford(resourceCost);
    note(`canAfford() → ${result}`);
    refresh();
  };

  const onApplyEffect = () => {
    actor.applyEffect(new Effect());
    note("applyEffect() — effect added to activeEffects.");
    refresh();
  };

  const onAddStat = (stat: AttributeStat) => {
    actor.attributes.addToStat(stat, 1);
    setFlashStat(stat);
    note(`addToStat(${stat}, 1) → ${actor.attributes.getStat(stat)}`);
    refresh();
  };

  const onSubtractStat = (stat: AttributeStat) => {
    actor.attributes.subtractFromStat(stat, 1);
    setFlashStat(stat);
    note(`subtractFromStat(${stat}, 1) → ${actor.attributes.getStat(stat)}`);
    refresh();
  };

  const onSetMight = () => {
    actor.attributes.setStat(AttributeStat.Might, 5);
    setFlashStat(AttributeStat.Might);
    note(`setStat(Might, 5) → ${actor.attributes.getStat(AttributeStat.Might)}`);
    refresh();
  };

  const onReset = () => {
    setActor(createTestActor());
    note("Actor reset.");
  };

  return (
    <main className="harness">
      <p className="harness__eyebrow">Engine smoke test</p>
      <h1 className="harness__brand">Hackfinder</h1>
      <p className="harness__lede">Actor + Attributes harness — poke the stubs and watch state move.</p>

      <section className="panel">
        <h2 className="panel__title">Actor</h2>
        <dl className="meta">
          <dt>id</dt>
          <dd>{actor.id}</dd>
          <dt>name</dt>
          <dd>{actor.name}</dd>
          <dt>acted this round</dt>
          <dd className={actor.actedThisRound ? "is-true" : undefined}>
            {String(actor.actedThisRound)}
          </dd>
          <dt>known actions</dt>
          <dd>{actor.knownActions.length}</dd>
          <dt>active effects</dt>
          <dd>{actor.activeEffects.length}</dd>
        </dl>
      </section>

      <section className="panel">
        <h2 className="panel__title">Attributes</h2>
        <ul className="stat-list">
          {STATS.map((stat) => (
            <li key={stat} className="stat-row">
              <span className="stat-row__label">{stat}</span>
              <strong className={`stat-row__value${flashStat === stat ? " flash" : ""}`}>
                {actor.attributes.getStat(stat)}
              </strong>
              <div className="stat-row__actions">
                <button type="button" className="btn btn--tiny btn--ghost" onClick={() => onAddStat(stat)}>
                  +1
                </button>
                <button type="button" className="btn btn--tiny" onClick={() => onSubtractStat(stat)}>
                  −1
                </button>
              </div>
            </li>
          ))}
        </ul>
        <div className="actions">
          <button type="button" className="btn btn--accent" onClick={onSetMight}>
            Set Might = 5
          </button>
        </div>
      </section>

      <section className="panel">
        <h2 className="panel__title">Actions</h2>
        <div className="actions">
          <button type="button" className="btn btn--accent" onClick={onTakeAction}>
            Take action
          </button>
          <button type="button" className="btn" onClick={onCanAfford}>
            Can afford?
          </button>
          <button type="button" className="btn" onClick={onApplyEffect}>
            Apply effect
          </button>
          <button type="button" className="btn btn--muted" onClick={onReset}>
            Reset
          </button>
        </div>
      </section>

      <p key={statusKey} className="status">
        <strong>Status</strong>
        {status}
      </p>
    </main>
  );
}
