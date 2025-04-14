// Main exports
export { mixSubstances } from './core/mixer';
export { encodeMixState, decodeMixState } from './utils/encoding';

// Data exports
export { effects } from './data/effects';
export { products, productAbbreviations } from './data/products';
export { substances } from './data/substances';
export { effectRulesBySubstance } from './data/rules';

// Type exports
export type {
  EffectCode,
  SubstanceCode,
  ProductType,
  RankCode,
  EffectData,
  SubstanceData,
  ProductData,
  EffectRule,
  MixResult,
  MixState,
} from './types';
