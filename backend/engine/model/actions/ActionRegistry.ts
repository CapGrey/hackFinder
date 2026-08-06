import type { Action } from "./Action";

export class ActionRegistry {
  private readonly actions = new Map<string, Action>();

  register(action: Action): void {
    if (this.actions.has(action.id)) {
      throw new Error(`Action already registered: ${action.id}`);
    }
    this.actions.set(action.id, action);
  }

  get(id: string): Action | undefined {
    return this.actions.get(id);
  }

  getAll(): Action[] {
    return [...this.actions.values()];
  }
}
