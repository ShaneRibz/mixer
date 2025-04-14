import { MixState, ProductType, SubstanceCode } from '../types';
import { products } from '../data/products';
import { substances } from '../data/substances';

/**
 * Encode a mix state into a URL-safe string
 */
export function encodeMixState(state: MixState): string {
  // Validate inputs
  if (!products[state.product]) {
    throw new Error('Invalid product type');
  }

  for (const substance of state.substances) {
    if (!substances[substance]) {
      throw new Error(`Invalid substance code: ${substance}`);
    }
  }

  const encoded = `${state.product}:${state.substances.join('')}`;
  return toBase64Url(encoded);
}

/**
 * Decode a mix state from a URL-safe string
 */
export function decodeMixState(hash: string): MixState | null {
  try {
    const decoded = fromBase64Url(hash);
    const [product, substancesStr] = decoded.split(':');

    if (!product || substancesStr === undefined || !products[product as ProductType]) {
      return null;
    }

    const substanceCodes = substancesStr.split('') as SubstanceCode[];

    // Validate substances
    for (const code of substanceCodes) {
      if (!substances[code]) {
        return null;
      }
    }

    return {
      product: product as ProductType,
      substances: substanceCodes,
    };
  } catch {
    return null;
  }
}

/**
 * Convert a string to a URL-safe base64 string
 */
function toBase64Url(str: string): string {
  return Buffer.from(str, 'binary')
    .toString('base64')
    .replace(/\+/g, '-')
    .replace(/\//g, '_')
    .replace(/=/g, '');
}

/**
 * Convert a URL-safe base64 string back to a regular string
 */
function fromBase64Url(str: string): string {
  const base64 = str.replace(/-/g, '+').replace(/_/g, '/');
  const padding = 4 - (base64.length % 4);
  const padded = padding < 4 ? base64 + '='.repeat(padding) : base64;
  return Buffer.from(padded, 'base64').toString('binary');
}
