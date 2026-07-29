# 📖 HACKFINDER: CORE DESIGN BIBLE & VTT ARCHITECTURE

## 1. VTT SOFTWARE ARCHITECTURE (MVC FRAMEWORK)

To build the digital testing sandbox, structure the codebase using the **Model-View-Controller (MVC)** framework to keep elements modular and swappable:

- **The View (UI/Display)**
- `DisplayService`: Renders the current state of the grid (ASCII in terminal or GUI like Pygame). Knows *nothing* about the game rules.
- `UIService`: Captures user inputs (clicks, keypresses) and passes commands to the Engine.
- **The Model (Data Containers)**
- `GridMap`: 2D array/dictionary managing discrete distances, X/Y coordinates, and geometric shapes (Spheres, Cones/45-degrees, Paths/contiguous squares).
- `Actor`: Subclass for PCs/Monsters. Stores the 5 primary resource pools (HP, EP, SP, Stamina, Mana) and attributes.
- `Terrain`: Subclass for elemental zones and physical obstacles.
- **The Controller (Game Engine / Logic)**
- `GameEngine`: Master state machine and main loop.
- `PhaseManager`: Cycles through the 4 synchronous combat phases.
- `ClockManager / TimeService`: Ticks PC Action Clocks down by 1 every round. Tracks GM's 3-round "Periods" and rolls the Escalation Die.
- `ResolutionService`: Calculates the D20 math vs Target Numbers (TN). Applies Untrained penalties (-5), and handles the generation of Sparks (+5) and Shadows (-5).

---



## 2. COMBAT FLOW & TIMEKEEPING

Hackfinder completely abandons traditional turn order in favor of a synchronous, phase-based system. Encounters are fast-paced marathons lasting **15 to 30 rounds**.

### The 4 Combat Phases (Per Round)

One complete cycle of these phases equals **1 Round** (or **1 Tick**).

1. **Elite Phase:** Reserved strictly for Elite enemies using actions with the "Elite" trait. *(Example action: Command: let an ally take a Heavy action this round).*
2. **Early Phase:** PCs execute actions tagged with the "Early" trait.
3. **Monster Phase:** Standard enemies execute actions. *(Elites can also optionally act here instead of Phase 1).*
4. **Late Phase:** PCs execute actions tagged with the "Late" trait.



### PC Action Economy & Clocks

- **1 Tick = 1 Round.** All active clocks tick down by 1 at the start of a new round.
- **PC Action Clocks:** Players start with 2 clocks (and may unlock more at higher levels):
  - A clock is used to take standard actions. When an action occupies a clock, it cannot be taken again using a differenct clock until the original clock clears.
- **Action Occupancy:** A Standard Action occupies an open clock for a set number of ticks (e.g., a heavy spell takes 6 ticks to clear).
- **Action Costs:** **At-Will** (0 cost), **Light/Minor** (2 Stamina/Mana cost), **Moderate** (medium cost, 4 resources), **Heavy** (massive cost: 6).
- **Quick Actions:** Minor actions (like movement) that can be taken while clocks are on cooldown.



### GM Monster Pacing (Periods)

To prevent GM burnout, monsters do not track granular action clocks.

- **Periods:** 1 Period = 3 Rounds.
- **Escalation Die:** Rolled at the start of a Period. It determines the action budget (Light, Moderate, or Heavy) the monsters can use *once* during that 3-round Period. Their actions in the other two rounds must be Quick actions.



### Durations & Tracking

1. **Instantaneous:** Immediate effect (no tracking).
2. **Tick-Bound:** Lasts until the end of the next tick (max 1-2 rounds).
3. **Clock-Bound:** Sustained effect; lasts as long as a player intentionally leaves a clock occupied.
4. **Event-Based:** Lingering effect; lasts indefinitely until a specific trigger or counteract roll clears it.
5. **Encounter-Long:** Lasts the duration of the skirmish (e.g., Stances).
6. **Daily:** Lasts for one in-game day.
7. **Downtime-Bound:** Clears only on a "Long Rest" (defined strictly in Hackfinder as 1 full week of downtime).

---



## 3. CORE RESOLUTION & META-CURRENCY

- **The Engine:** `D20 + Modifiers vs. Target Number (TN)`. TNs scale based on level (similar to a DC-by-level table).
- **Player-Facing Defense:** The GM does not roll; PCs make active Defense Rolls vs the TN of the incoming attack. **One roll per action.**



### The Meta-Currency (Sparks & Shadows)

- **Sparks (Player Currency):** Generated for every **+5 above the TN**. Spent by players for immediate, positive rider effects (cleansing debuffs, extra damage, pushing enemies). *A Nat 20 grants 1 extra Spark.*
- **Shadows (GM Currency):** Generated for every **-5 below the TN**. Spent by GM for immediate negative effects/punishments. *A Nat 1 grants 1 extra Shadow.*
- *Note: Sparks and Shadows are generally mutually exclusive on the same roll.*



### Proficiency ("Access Rights")

- **Untrained:** +0
- **Trained (Access Rights):** +2 
- **Expert +4/ Master +6 / Legendary +8:** Unlocks exclusive, devastating Spark Menus and grants the ability to use restricted, top-tier gear.

---



## 4. ATTRIBUTES & VITAL RESOURCES

Four core attributes govern standard checks, Defenses, and the 5 vital resource pools.

1. **Might (Strength/Fortitude):** Governs Might Defense and **Hit Points (HP)** (immediate physical attrition).
2. **Agility (Speed/Reflexes):** Governs Agility Defense and **Stamina** (tactical resource spent to power minor martial/weapon abilities).
3. **Mind (Intelligence/Mental):** Governs Mind Defense and **Sanity Points (SP)** (specialized mental health).
4. **Spirit (Conviction/Will):** Governs Spirit Defense and **Endurance Points (EP)** (macro-health; depletes on major setbacks/0 HP or GM spending Shadows. Dictates daily healing recoveries).

- *Note: **Mana** (magical resource) is governed by either Mind or Spirit, depending on the chosen Archetype.*

---



## 5. DAMAGE TYPES & TAGS

Capital "D" Damage exclusively subtracts from **HP** or **SP**. Anything else is a Condition, Debuff, or Wound.

### The 5 Damage Types (The Math)

1. **Kinetic:** Physical baseline. Targets HP. Mitigated by physical Armor.
2. **Energy:** Non-physical baseline. Targets HP.
3. **Explosive:** Concussive force. Targets HP, but *completely ignores PC physical armor dice*.
4. **Cognitive:** Asymmetrical mental threat. Targets Monster HP, but directly drains Player SP (bypassing HP entirely).
5. **Lingering:** Attrition engine (Damage Over Time). Resolves against HP. Requires time/event to clear.



### Tags (The Narrative & Mechanics)

Tags (e.g., *Area, Fire, Void, Slashing, Toxin, Knockback*) dictate narrative flavor and environmental interactions. Crucially, Tags **dictate which specific Spark Menu a player unlocks** when they roll +5 over the TN.

---



## 6. EQUIPMENT & SHIELDS



### Armor System

- **Slots:** 5 slots (Head, Chest, Arms, Legs, Flexible).
- **Dice Mitigation:** Players spend physical armor dice (**D4 to D12**) to actively block Kinetic damage. Each piece blocks *once* before needing short-term repairs.



### Shields (Active Defense Mini-Game)

Shields are active offensive/defensive martial weapons with Tags (Bludgeoning, Concussive). They are proactive and do not grant passive bonuses just for being equipped.

- **Raise Shield (Action):** Readies the shield, granting access to roll-less reactions.
- **Shield Block (Reaction):** Spend Stamina on a failed Defense Roll to automatically reduce incoming damage by a flat value/tier (No D20 roll).
- **Parry (Reaction):** High-risk second chance. Spend Stamina to re-roll a failed Defense Roll. Success = 0 damage. Failure = amplified damage/severe penalty.

---



## 7. CHARACTER PROGRESSION MATRIX (Level 0 – 12)

- **Level Cap:** 12. Final build matrix = 1 Core, 3 Archetypes, 1 Ancestry.
- **The Bucket System:** Upgrades are strictly siloed. Players must pick from the specific bucket granted at their given level.



### Anatomy of a PC

1. **The Core:** Primary tactical job (Tank, DPS, Support, Controller). Highly flavorful but **Magic/Martial Agnostic** (never forces specific weapons/spells). Dictates baseline HP, starting Macro-resources, Level 0 Core Feat, and Core Engine mechanics.
2. **The Archetype:** Methodology (e.g., Spellblade, Necromancer). Grants "Access Rights" to Spells/Techniques (removing the -5 penalty), Key Features, and a **Unique Resource Recharge** mechanic to regenerate Stamina/Mana mid-combat.
3. **Cross-Class Utilities:** 9 Spell Disciplines and ~9 Fighting Techniques. Shared globally (e.g., *Life* magic can be taken by an Acolyte or a Necromancer).



### Leveling Cadence


| Level | Core Progression (Even Levels) | Archetype Progression (Odd Levels) | Ancestry Progression (Odd Levels) | General Upgrades & Utilities |
| ----- | ------------------------------ | ---------------------------------- | --------------------------------- | ---------------------------- |
| **0** | **Gain Primary Core** / Choose 1st Core Feat (Tier 0)| — | **Choose Ancestry** | **Starting Equipment** / Select Armor, Weapons, Implements 
| **1** | — | **Unlock 1st Archetype** /  Choose 1st Specialization Feat | Choose 1st Ancestry Feat | +1 Ability Score Impr. (ASI) |
| **2** |  Choose Core Feat (Tier 0 Pool) | — | — | 1st Spell/Tech Option / +1 ASI |
| **3** | — |  Choose Specialization Feat |  Choose Ancestry Feat |  +1 ASI |
| **4** |  Choose Core Feat (Unlocks Tier 4) | — | — |  2nd Spell/Tech Option / +1 ASI |
| **5** | — | **Unlock 2nd Archetype** / Choose Specialization Feat |  Choose Ancestry Feat |  +1 ASI |
| **6** |  Choose Core Feat (Tier 4 Pool) | — | — |  3rd Spell/Tech Option  / +1 ASI |
| **7** | — |  Choose Specialization Feat |  Choose Ancestry Feat |  +1 ASI |
| **8** |  Choose Core Feat (Unlocks Tier 8) | — | — |  4th Spell/Tech Option / +1 ASI |
| **9** | — | **Unlock 3rd Archetype** / Choose Specialization Feat |  Choose Ancestry Feat |  +1 ASI |
| **10** |  Choose Core Feat (Tier 8 Pool) | — | — |  5th Spell/Tech Option / +1 ASI |
| **11** | — |  Choose Specialization Feat |  Choose Ancestry Feat |  +1 ASI |
| **12** |  Choose Core Feat (Unlocks Tier 12) | — | — |  6th Spell/Tech Option / +1 ASI |

---




## 8. DEFINED CORE CHASSIS (LEVEL 0 BASELINES)



### A. The Psionic Guard (Tank Core)

- **Vitals:** High HP, massive bonus to Sanity Points (SP). *Cannot use standard physical armor.*
- **Engine:** Spends 1 SP to manifest a virtual armor die (scales from D6 to D10) to mitigate damage.
- **Aegis Pulse:** Light cost (Early Phase). Detonates an aura granting allies partial cover until the end of the next tick.



### B. The Kinetic Shaper (Controller Core)

- **Vitals:** Mod HP. No macro-resource adjustments.
- **Engine (Elemental Portfolio):** Attunes to a base element at Level 0. Spends actions to project that element onto the grid by dynamically choosing a geometric shape: Sphere, Cone (45-deg), or Path (contiguous plotted squares).



### C. The Commander (Support Core)

- **Vitals:** Moderate HP. No macro-resource adjustments.
- **Engine (Clock Sharing):** Costs a Moderate resource (Mana or Stamina, chosen daily). Executed in the *Early Phase* to issue a command; target ally executes a Standard Action in the *Late Phase*. The tick cooldown of that action is applied to the *Commander's* Action Clock, keeping the ally free. (Restricted to At-Will/Light actions at Lv0, scales to Heavy by Lv8).



### D. The Guardian (Tank Core)

- **Vitals:** Max HP, bonus to Endurance Points (EP).
- **Engine:** Active Interception (relocate to an adjacent ally to intercept an attack). Provocation (striking enemies applies a *Challenged* condition; if they attack anyone else, they suffer massive TN penalties or cost the GM Shadows).



### E. The Knight (Tank Core)

- **Vitals:** High HP.
- **Engine:** *Placeholder for heroic interception and forced targeting abilities.*



### F. The Precisionist (DPS Core)

- **Vitals:** Moderate HP. Utilizes a unique "Adrenaline" pool (functions as Stamina/Mana strictly for Attack traits).
- **Engine:** Exploits specific vulnerability conditions on the battlefield to trigger massive burst damage.



### G. The Acolyte (Support Core)

- **Vitals:** Low/Mod HP, bonus to Endurance Points (EP).
- **Engine:** Domain prayers (Life, Death, Sea, War). Uses standard TN-by-PC-Level scaling to perform cleanse/healing checks.



### H. Generic Cores (Placeholders)

- **The Defender (Tank):** Raw physical HP attrition/bodyguard.
- **The Striker (DPS):** Flat damage consistency and mobility.
- **The Tactician (Support):** Action donation stripped of magical/divine flavor.
- **The Controller (Controller):** Generic zone manipulation.

