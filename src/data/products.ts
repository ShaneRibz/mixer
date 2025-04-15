import type { ProductData, ProductType } from '../types';

export const products: Record<ProductType, ProductData> = {
  'OG Kush': {
    price: 35,
    effects: ['Ca'],
    abbreviation: 'OH',
  },
  'Sour Diesel': {
    price: 35,
    effects: ['Re'],
    abbreviation: 'SL',
  },
  'Green Crack': {
    price: 35,
    effects: ['En'],
    abbreviation: 'GK',
  },
  'Grandaddy Purple': {
    price: 35,
    effects: ['Se'],
    abbreviation: 'GE',
  },
  Meth: {
    price: 70,
    effects: [],
    abbreviation: 'MH',
  },
  Cocaine: {
    price: 150,
    effects: [],
    abbreviation: 'CE',
  },
};

export const productAbbreviations: Record<string, ProductType> = Object.entries(products).reduce(
  (acc, [product, data]) => {
    acc[data.abbreviation] = product as ProductType;
    return acc;
  },
  {} as Record<string, ProductType>
);
