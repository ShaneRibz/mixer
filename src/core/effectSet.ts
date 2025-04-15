import type { EffectCode } from '../types';

export class EffectSet {
  private effects: Set<EffectCode>;

  constructor(initialEffects: EffectCode[] = []) {
    this.effects = new Set(initialEffects);
  }

  /**
   * Add an effect to the set
   * @param effect - The effect to add
   * @returns True if the effect was added, false if it already exists
   */
  add(effect: EffectCode): boolean {
    const alreadyExists = this.effects.has(effect);
    this.effects.add(effect);
    return !alreadyExists;
  }

  /**
   * Remove an effect from the set
   * @param effect - The effect to remove
   * @returns True if the effect was removed, false if it didn't exist
   */
  remove(effect: EffectCode): boolean {
    const existed = this.effects.has(effect);
    this.effects.delete(effect);
    return existed;
  }

  /**
   * Check if the set contains an effect
   * @param effect - The effect to check for
   * @returns True if the effect is in the set, false otherwise
   */
  has(effect: EffectCode): boolean {
    return this.effects.has(effect);
  }

  /**
   * Convert the set to an array
   * @returns An array of effects
   */
  toArray(): EffectCode[] {
    return Array.from(this.effects);
  }

  /**
   * Get the size of the set
   * @returns The number of effects in the set
   */
  size(): number {
    return this.effects.size;
  }

  /**
   * Clone the set
   * @returns A new set with the same effects
   */
  clone(): EffectSet {
    const clone = new EffectSet();
    clone.effects = new Set(this.effects);
    return clone;
  }
}
