import { EffectSet } from '../src/core/effectSet';

describe('EffectSet', () => {
  test('should handle basic operations', () => {
    const set = new EffectSet();
    set.add('Ca');
    set.add('Re');

    expect(set.has('Ca')).toBe(true);
    expect(set.has('Re')).toBe(true);
    expect(set.has('En')).toBe(false);

    set.remove('Ca');
    expect(set.has('Ca')).toBe(false);

    expect(set.size()).toBe(1);
    expect(set.toArray()).toContain('Re');
  });

  test('should handle cloning', () => {
    const original = new EffectSet(['Ca', 'Re']);
    const clone = original.clone();

    original.add('En');

    expect(clone.has('En')).toBe(false);
    expect(original.has('En')).toBe(true);
  });
});
