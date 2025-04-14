import type { MixState } from '../src/types';

import { decodeMixState, encodeMixState } from '../src/utils/encoding';

describe('Mix State Encoding/Decoding', () => {
  test('should encode and decode correctly', () => {
    const state: MixState = {
      product: 'OG Kush',
      substances: ['Cuke', 'Flu Medicine', 'Gasoline'],
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
