import type { EffectCode, EffectRule, MixResult, ProductType, SubstanceCode } from '../types';

import { effects } from '../data/effects';
import { products } from '../data/products';
import { effectRulesBySubstance } from '../data/rules';
import { substances } from '../data/substances';
import { EffectSet } from './effectSet';

const MAX_EFFECTS = 8;

/**
 * Calculate the result of mixing substances with a product
 */
export function mixSubstances(product: ProductType, substanceCodes: SubstanceCode[]): MixResult {
  if (!products[product]) {
    throw new Error(`Unknown product: ${product}`);
  }

  const productInfo = products[product];
  const effectsSet = new EffectSet(productInfo.effects);
  const processedEffects = new EffectSet();
  const removedEffects = new EffectSet();

  let totalCost = 0;

  for (const code of substanceCodes) {
    const substance = substances[code];
    if (!substance) continue;

    totalCost += substance.price;

    applySubstanceRules(code, effectsSet, processedEffects, removedEffects);

    if (effectsSet.size() < MAX_EFFECTS) {
      for (const effect of substance.effect) {
        if (!effectsSet.has(effect)) {
          effectsSet.add(effect);
          if (effectsSet.size() >= MAX_EFFECTS) break;
        }
      }
    }
  }

  const finalEffects = effectsSet.toArray().slice(0, MAX_EFFECTS);
  const effectValue = calculateEffectValue(finalEffects);
  const productPrice = productInfo.price;
  const sellPrice = Math.round(productPrice * (1 + effectValue));
  const profit = sellPrice - totalCost - productPrice;
  const profitMargin = Math.round((profit / sellPrice) * 100) / 100;

  return {
    effects: finalEffects,
    cost: totalCost,
    sellPrice,
    profit,
    profitMargin,
  };
}

/**
 * Apply the rules for a substance to the current effect set
 */
function applySubstanceRules(
  substanceCode: SubstanceCode,
  effectsSet: EffectSet,
  processedEffects: EffectSet,
  removedEffects: EffectSet
): void {
  const rules = effectRulesBySubstance[substanceCode];
  if (!rules || rules.length === 0) return;

  const initialEffects = effectsSet.clone();
  const appliedRules = new Set<number>();

  // Phase 1: Apply rules where conditions are met in the initial state
  for (let i = 0; i < rules.length; i++) {
    const rule = rules[i];

    if (checkRulePreconditions(rule, initialEffects)) {
      applyReplaceEffects(
        rule.replace,
        initialEffects,
        effectsSet,
        processedEffects,
        removedEffects
      );
      appliedRules.add(i);
    }
  }

  // Phase 2: Apply rules where conditions are met after phase 1
  for (let i = 0; i < rules.length; i++) {
    if (appliedRules.has(i)) continue;

    const rule = rules[i];

    if (meetsPhaseTwo(rule, initialEffects, effectsSet, removedEffects)) {
      if (canApplyTransformation(rule.replace, effectsSet)) {
        applyTransformations(rule.replace, effectsSet, processedEffects);
      }
    }
  }
}

/**
 * Check if a rule's preconditions are met
 */
function checkRulePreconditions(rule: EffectRule, initialEffects: EffectSet): boolean {
  // Check if all required effects are present
  for (const effect of rule.ifPresent) {
    if (!initialEffects.has(effect)) return false;
  }

  // Check if all forbidden effects are absent
  for (const effect of rule.ifNotPresent) {
    if (initialEffects.has(effect)) return false;
  }

  // Check if at least one replaceable effect is present
  for (const oldEffect of Object.keys(rule.replace) as EffectCode[]) {
    if (initialEffects.has(oldEffect)) return true;
  }

  return false;
}

/**
 * Check if a rule meets phase two conditions
 */
function meetsPhaseTwo(
  rule: EffectRule,
  initialEffects: EffectSet,
  currentEffects: EffectSet,
  removedEffects: EffectSet
): boolean {
  // All required effects must have been initially present
  for (const effect of rule.ifPresent) {
    if (!initialEffects.has(effect)) return false;
  }

  // At least one forbidden effect must have been removed
  let hasRemovedForbidden = false;
  for (const effect of rule.ifNotPresent) {
    if (removedEffects.has(effect)) {
      hasRemovedForbidden = true;
      break;
    }
  }
  if (!hasRemovedForbidden) return false;

  // All forbidden effects must be absent from current set
  for (const effect of rule.ifNotPresent) {
    if (currentEffects.has(effect)) return false;
  }

  return true;
}

/**
 * Check if a transformation can be applied
 */
function canApplyTransformation(
  replace: Partial<Record<EffectCode, EffectCode>>,
  effectsSet: EffectSet
): boolean {
  for (const oldEffect of Object.keys(replace) as EffectCode[]) {
    if (effectsSet.has(oldEffect)) return true;
  }
  return false;
}

/**
 * Apply effect replacements
 */
function applyReplaceEffects(
  replace: Partial<Record<EffectCode, EffectCode>>,
  initialEffects: EffectSet,
  effectsSet: EffectSet,
  processedEffects: EffectSet,
  removedEffects: EffectSet
): void {
  for (const [oldEffect, newEffect] of Object.entries(replace) as [EffectCode, EffectCode][]) {
    if (initialEffects.has(oldEffect)) {
      effectsSet.remove(oldEffect);
      effectsSet.add(newEffect);
      processedEffects.add(oldEffect);
      removedEffects.add(oldEffect);
    }
  }
}

/**
 * Apply transformations to effects
 */
function applyTransformations(
  replace: Partial<Record<EffectCode, EffectCode>>,
  effectsSet: EffectSet,
  processedEffects: EffectSet
): void {
  for (const [oldEffect, newEffect] of Object.entries(replace) as [EffectCode, EffectCode][]) {
    if (effectsSet.has(oldEffect)) {
      effectsSet.remove(oldEffect);
      effectsSet.add(newEffect);
      processedEffects.add(oldEffect);
    }
  }
}

/**
 * Calculate the total value multiplier from effects
 */
function calculateEffectValue(effectCodes: EffectCode[]): number {
  let value = 0;
  for (const code of effectCodes) {
    value += effects[code]?.price || 0;
  }
  return value;
}
