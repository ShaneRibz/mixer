import type { EffectCode } from '../types';

export class EffectSet {
  private effects: Set<EffectCode>;

  constructor(initialEffects: EffectCode[] = []) {
    this.effects = new Set(initialEffects);
  }

  add(effect: EffectCode): boolean {
    const alreadyExists = this.effects.has(effect);
    this.effects.add(effect);
    return !alreadyExists;
  }

  remove(effect: EffectCode): boolean {
    const existed = this.effects.has(effect);
    this.effects.delete(effect);
    return existed;
  }

  has(effect: EffectCode): boolean {
    return this.effects.has(effect);
  }

  toArray(): EffectCode[] {
    return Array.from(this.effects);
  }

  size(): number {
    return this.effects.size;
  }

  clone(): EffectSet {
    const clone = new EffectSet();
    clone.effects = new Set(this.effects);
    return clone;
  }
}
