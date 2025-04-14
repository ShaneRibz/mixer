# Schedule1 Mixer

A package for calculating substance mixes in the game Schedule 1.

## Installation

```bash
npm install @schedule1-tools/mixer
```

## Usage

```typescript
import { mixSubstances, encodeMixState, decodeMixState } from '@schedule1-tools/mixer';

// Calculate a mix
const result = mixSubstances('OG Kush', ['A', 'B', 'C']);
console.log(result);
/*
{
  effects: ['En', 'Se', 'To'],
  cost: 12,
  sellPrice: 42,
  profit: -5,
  profitMargin: -0.119
}
*/

// Encode a mix state for sharing
const encoded = encodeMixState({
  product: 'OG Kush',
  substances: ['A', 'B', 'C'],
});
console.log(encoded); // "T0cgS3VzaDpBQkM"

// Decode a mix state
const decoded = decodeMixState('T0cgS3VzaDpBQkM');
console.log(decoded);
/*
{
  product: 'OG Kush',
  substances: ['A', 'B', 'C']
}
*/
```

## Exports

The package also exports the following data objects:

- `effects`: Information about all effects
- `products`: Information about all products
- `substances`: Information about all substances
- `effectRulesBySubstance`: Rules for how substances transform effects
