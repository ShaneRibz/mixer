import type { MixState, ProductType, SubstanceCode } from '../types';

import { products } from '../data/products';
import { substanceAbbreviations, substances } from '../data/substances';

/**
 * Encode a mix state into a URL-safe string
 * @throws Error if the product type or any substance code is invalid
 */
export function encodeMixState(state: MixState): string {
  if (!products[state.product]) {
    throw new Error(`Invalid product type: ${state.product}`);
  }

  for (const substance of state.substances) {
    if (!substances[substance]) {
      throw new Error(`Invalid substance code: ${substance}`);
    }
  }

  const abbreviatedSubstances = state.substances.map((s) => {
    const abbr = substances[s].abbreviation;
    if (!abbr) {
      throw new Error(`Missing abbreviation for substance: ${s}`);
    }
    return abbr;
  });

  const encoded = `${state.product}:${abbreviatedSubstances.join('')}`;
  return toBase64Url(encoded);
}

/**
 * Decode a mix state from a URL-safe string
 * @returns The decoded MixState or null if invalid
 */
export function decodeMixState(hash: string): MixState | null {
  if (!hash || typeof hash !== 'string') {
    return null;
  }

  try {
    const decoded = fromBase64Url(hash);
    const parts = decoded.split(':');

    if (parts.length !== 2) {
      return null;
    }

    const [product, substancesStr] = parts;

    if (!product || !products[product as ProductType]) {
      return null;
    }

    const substanceCodes: SubstanceCode[] = [];

    if (substancesStr) {
      for (let i = 0; i < substancesStr.length; i++) {
        const abbr = substancesStr[i];
        const fullName = substanceAbbreviations[abbr];

        if (!fullName || !substances[fullName]) {
          return null;
        }

        substanceCodes.push(fullName);
      }
    }

    return {
      product: product as ProductType,
      substances: substanceCodes,
    };
  } catch (error) {
    return null;
  }
}

/**
 * Convert a string to a URL-safe base64 string
 */
function toBase64Url(str: string): string {
  return Buffer.from(str, 'utf-8')
    .toString('base64')
    .replace(/\+/g, '-')
    .replace(/\//g, '_')
    .replace(/=/g, '');
}

/**
 * Convert a URL-safe base64 string back to a regular string
 */
function fromBase64Url(str: string): string {
  if (typeof str !== 'string') {
    throw new Error('Input must be a string');
  }

  const base64 = str.replace(/-/g, '+').replace(/_/g, '/');
  const padding = base64.length % 4;
  const padded = padding ? base64 + '='.repeat(4 - padding) : base64;
  return Buffer.from(padded, 'base64').toString('utf-8');
}
