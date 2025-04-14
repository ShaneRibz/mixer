# Schedule1 Mixer

A package for calculating substance mixes in the game Schedule 1.

## Installation

```bash
npm install @schedule1-tools/mixer
```

## Usage

```typescript
import { decodeMixState, encodeMixState, mixSubstances } from '@schedule1-tools/mixer';

// Calculate a mix
const result = mixSubstances('OG Kush', ['Cuke', 'Flu Medicine', 'Gasoline']);
console.log(result);
/*
{
  effects: [ 'Be', 'Eu', 'Se', 'To' ],
  cost: 12,
  sellPrice: 64,
  profit: 17,
  profitMargin: 0.27
}
*/

// Encode a mix state for sharing
const encoded = encodeMixState({
  product: 'OG Kush',
  substances: ['Cuke', 'Flu Medicine', 'Gasoline'],
});
console.log(encoded); // "T0cgS3VzaDpBQkM"

// Decode a mix state
const decoded = decodeMixState('T0cgS3VzaDpBQkM');
console.log(decoded);
/*
{
  product: 'OG Kush',
  substances: [ 'Cuke', 'Flu Medicine', 'Gasoline' ]
}
*/
```

## Exports

The package also exports the following data objects:

- `effects`: Information about all effects
- `products`: Information about all products
- `substances`: Information about all substances
- `effectRulesBySubstance`: Rules for how substances transform effects
