import { encodeMixState, decodeMixState } from '../src/utils/encoding';
import { MixState } from '../src/types';

describe('Mix State Encoding/Decoding', () => {
  test('should encode and decode correctly', () => {
    const state: MixState = {
      product: 'OG Kush',
      substances: ['A', 'B', 'C'],
    };

    const encoded = encodeMixState(state);
    const decoded = decodeMixState(encoded);

    expect(decoded).toEqual(state);
  });

  test('should handle empty substances', () => {
    const state: MixState = {
      product: 'OG Kush',
      substances: [],
    };

    const encoded = encodeMixState(state);
    const decoded = decodeMixState(encoded);

    expect(decoded).toEqual(state);
  });
});
