import { mixSubstances } from '../src/core/mixer';

describe('mixSubstances', () => {
  test('should calculate basic mix correctly', () => {
    const result = mixSubstances('OG Kush', ['A']);
    expect(result.effects).toContain('Ca');
    expect(result.effects).toContain('En');
    expect(result.cost).toBe(2);
    expect(result.sellPrice).toBe(46);
    expect(result.profit).toBe(9);
    expect(result.profitMargin).toBeCloseTo(0.2, 2);
  });

  test('should apply transformation rules correctly', () => {
    const result = mixSubstances('OG Kush', ['B', 'A']);

    expect(result.effects).toContain('Se');
    expect(result.effects).toContain('En');
    expect(result.effects).not.toContain('Ca');
    expect(result.effects).toContain('Be');
  });

  test('should respect maximum effects limit', () => {
    const result = mixSubstances('OG Kush', ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I']);
    expect(result.effects.length).toBeLessThanOrEqual(8);
  });
});

describe('mixSubstances edge cases', () => {
  test('should handle empty substances array', () => {
    const result = mixSubstances('OG Kush', []);
    expect(result.effects).toEqual(['Ca']);
    expect(result.cost).toBe(0);
  });

  test('should handle invalid substances gracefully', () => {
    // @ts-ignore - Testing runtime behavior with invalid input
    const result = mixSubstances('OG Kush', ['A', 'Z', 'B']);

    // Should ignore invalid substance 'Z' but still process A and B
    expect(result.effects).toContain('En'); // From A
    expect(result.effects).toContain('Se'); // From B
  });
});
