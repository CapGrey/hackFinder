# Hackfinder Documentation

Design documents and game rules for the Hackfinder TTRPG and VTT engine.

## Index

### Game Rules

- [version_0.01.md](gameRules/version_0.01.md) — Core Design Bible: combat flow, resolution, attributes, damage, equipment, progression matrix, and Level 0 Core chassis definitions.

### Software Design Documents (SDDs)

- [game-engine-class-diagram.md](SDDs/game-engine-class-diagram.md) — TypeScript OOP class diagram (v0.4): MVC architecture, `backend/engine` vs `frontend/sheet`, view adapters on frontend, PC/Monster actors, and engine v0.1 scope boundary.

## Code layout

| Path | Role |
|------|------|
| `backend/engine/` | Game rules engine (pure TypeScript); `Command` / `DisplayState` in `core/` |
| `frontend/sheet/` | Character sheet UI; `UIService` / `DisplayService` in `src/services/` |

## Reading Order

1. Start with **gameRules/version_0.01.md** to understand the game systems.
2. Read **SDDs/game-engine-class-diagram.md** to see how those rules map to engine classes and repo layout.
3. Implement engine v0.1 per the SDD scope section before expanding to progression, equipment, or networking.
