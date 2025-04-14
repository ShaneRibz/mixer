import type { EffectCode } from '../types';

export class EffectSet {
  private static readonly effectToIndex: Map<EffectCode, number> = new Map();
  private static readonly indexToEffect: Map<number, EffectCode> = new Map();
  private static initialized = false;

  private bits: number = 0;

  /**
   * Initialize the static mapping between effect codes and bit positions
   */
  private static initialize(): void {
    if (this.initialized) return;

    const effects: EffectCode[] = [
      'Ag',
      'At',
      'Ba',
      'Be',
      'Ca',
      'Cd',
      'Cy',
      'Di',
      'El',
      'En',
      'Eu',
      'Ex',
      'Fc',
      'Fo',
      'Gi',
      'Gl',
      'Je',
      'La',
      'Lf',
      'Mu',
      'Pa',
      'Re',
      'Sc',
      'Se',
      'Sh',
      'Si',
      'Sl',
      'Sm',
      'Sn',
      'Sp',
      'To',
      'Tp',
      'Tt',
      'Zo',
    ];

    effects.forEach((effect, index) => {
      this.effectToIndex.set(effect, index);
      this.indexToEffect.set(index, effect);
    });

    this.initialized = true;
  }

  constructor(initialEffects: EffectCode[] = []) {
    EffectSet.initialize();

    for (const effect of initialEffects) {
      this.add(effect);
    }
  }

  /**
   * Add an effect to the set
   * @returns true if the effect was added, false if it was already present
   */
  add(effect: EffectCode): boolean {
    const index = EffectSet.effectToIndex.get(effect);
    if (index === undefined) return false;

    const mask = 1 << index;
    const alreadyExists = (this.bits & mask) !== 0;
    this.bits |= mask;
    return !alreadyExists;
  }

  /**
   * Remove an effect from the set
   * @returns true if the effect was removed, false if it wasn't present
   */
  remove(effect: EffectCode): boolean {
    const index = EffectSet.effectToIndex.get(effect);
    if (index === undefined) return false;

    const mask = 1 << index;
    const existed = (this.bits & mask) !== 0;
    this.bits &= ~mask;
    return existed;
  }

  /**
   * Check if an effect is in the set
   */
  has(effect: EffectCode): boolean {
    const index = EffectSet.effectToIndex.get(effect);
    if (index === undefined) return false;

    return (this.bits & (1 << index)) !== 0;
  }

  /**
   * Convert the set to an array of effect codes
   */
  toArray(): EffectCode[] {
    const result: EffectCode[] = [];

    for (let i = 0; i < 34; i++) {
      if ((this.bits & (1 << i)) !== 0) {
        const effect = EffectSet.indexToEffect.get(i);
        if (effect) result.push(effect);
      }
    }

    return result;
  }

  /**
   * Get the number of effects in the set
   */
  size(): number {
    let count = 0;
    let n = this.bits;

    while (n) {
      n &= n - 1;
      count++;
    }

    return count;
  }

  /**
   * Create a copy of this effect set
   */
  clone(): EffectSet {
    const clone = new EffectSet();
    clone.bits = this.bits;
    return clone;
  }
}
