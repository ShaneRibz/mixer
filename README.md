# Schedule1 Mixer

A package for calculating substance mixes in the game Schedule 1.

## Installation

```bash
npm install @schedule1-tools/mixer
```

## Usage

### Calculate a mix

```typescript
const result = mixSubstances('OG Kush', ['Cuke', 'Flu Medicine', 'Gasoline']);

/*
{
  effects: [ 'Be', 'Eu', 'Se', 'To' ],
  cost: 12,
  sellPrice: 64,
  profit: 17,
  profitMargin: 0.27
}
*/
```

### Encode a mix state for sharing

```typescript
const encoded = encodeMixState({
  product: 'OG Kush',
  substances: ['Cuke', 'Flu Medicine', 'Gasoline'],
});

// "T0cgS3VzaDpBQkM"
```

### Decode a mix state

```typescript
const decoded = decodeMixState('T0cgS3VzaDpBQkM');

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

## Notice

This is a fan-made project and is not affiliated with, authorized, maintained, sponsored, or endorsed by the developers of Schedule I the game. All game-related content, including but not limited to names, trademarks, and copyrights, belong to their respective owners.
