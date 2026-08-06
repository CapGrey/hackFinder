import { useState } from "react";
import { PcSheet } from "./PcSheet";
import { MonsterSheet } from "./MonsterSheet";
import "./App.css";

type SheetKind = "pc" | "monster";

export function App() {
  const [sheet, setSheet] = useState<SheetKind>("pc");

  return (
    <main className="app">
      <header className="app__header">
        <p className="app__eyebrow">Hackfinder</p>
        <h1 className="app__title">Simple Sheet</h1>
        <nav className="tabs" aria-label="Sheet type">
          <button
            type="button"
            className={`tabs__btn${sheet === "pc" ? " is-active" : ""}`}
            onClick={() => setSheet("pc")}
          >
            PC
          </button>
          <button
            type="button"
            className={`tabs__btn${sheet === "monster" ? " is-active" : ""}`}
            onClick={() => setSheet("monster")}
          >
            Monster
          </button>
        </nav>
      </header>
      {sheet === "pc" ? <PcSheet /> : <MonsterSheet />}
    </main>
  );
}
