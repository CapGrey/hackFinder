import { useState } from "react";
import { Action } from "@engine/model/actions/Action";
import { Effect } from "@engine/model/effects/Effect";
import { ResourceCost } from "@engine/valueObjects/ResourceCost";
import { createTestActor, type TestActor } from "./TestActor";

export function App() {
  const [actor, setActor] = useState<TestActor>(() => createTestActor());
  const [status, setStatus] = useState("Ready.");
  const [, bump] = useState(0);
  const refresh = () => bump((n) => n + 1);

  const onTakeAction = () => {
    actor.takeAction(new Action());
    setStatus("takeAction() called — actedThisRound set true.");
    refresh();
  };

  const onCanAfford = () => {
    const result = actor.canAfford(new ResourceCost());
    setStatus(`canAfford() → ${result}`);
    refresh();
  };

  const onApplyEffect = () => {
    actor.applyEffect(new Effect());
    setStatus("applyEffect() called — effect added to activeEffects.");
    refresh();
  };

  const onReset = () => {
    setActor(createTestActor());
    setStatus("Actor reset.");
  };

  return (
    <main style={{ fontFamily: "system-ui, sans-serif", maxWidth: 480, margin: "2rem auto", padding: "0 1rem" }}>
      <h1>Actor harness</h1>
      <p>Visual smoke test for engine <code>Actor</code> stubs.</p>

      <dl>
        <dt>id</dt>
        <dd>{actor.id}</dd>
        <dt>name</dt>
        <dd>{actor.name}</dd>
        <dt>actedThisRound</dt>
        <dd>{String(actor.actedThisRound)}</dd>
        <dt>knownActions</dt>
        <dd>{actor.knownActions.length}</dd>
        <dt>activeEffects</dt>
        <dd>{actor.activeEffects.length}</dd>
      </dl>

      <div style={{ display: "flex", flexWrap: "wrap", gap: "0.5rem" }}>
        <button type="button" onClick={onTakeAction}>
          Take action
        </button>
        <button type="button" onClick={onCanAfford}>
          Can afford?
        </button>
        <button type="button" onClick={onApplyEffect}>
          Apply effect
        </button>
        <button type="button" onClick={onReset}>
          Reset
        </button>
      </div>

      <p style={{ marginTop: "1.5rem" }}>
        <strong>Status:</strong> {status}
      </p>
    </main>
  );
}
