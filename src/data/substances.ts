import { EffectCode, RankCode, SubstanceCode, SubstanceData } from '../types';

export const substances: Record<SubstanceCode, SubstanceData> = {
  A: {
    name: 'Cuke',
    rank: '1',
    price: 2,
    effect: ['En'],
  },
  B: {
    name: 'Flu Medicine',
    rank: '4',
    price: 5,
    effect: ['Se'],
  },
  C: {
    name: 'Gasoline',
    rank: '5',
    price: 5,
    effect: ['To'],
  },
  D: {
    name: 'Donut',
    rank: '1',
    price: 3,
    effect: ['Cd'],
  },
  E: {
    name: 'Energy Drink',
    rank: '6',
    price: 6,
    effect: ['At'],
  },
  F: {
    name: 'Mouth Wash',
    rank: '3',
    price: 4,
    effect: ['Ba'],
  },
  G: {
    name: 'Motor Oil',
    rank: '7',
    price: 6,
    effect: ['Sl'],
  },
  H: {
    name: 'Banana',
    rank: '1',
    price: 2,
    effect: ['Gi'],
  },
  I: {
    name: 'Chili',
    rank: '9',
    price: 7,
    effect: ['Sp'],
  },
  J: {
    name: 'Iodine',
    rank: '11',
    price: 8,
    effect: ['Je'],
  },
  K: {
    name: 'Paracetamol',
    rank: '1',
    price: 3,
    effect: ['Sn'],
  },
  L: {
    name: 'Viagra',
    rank: '2',
    price: 4,
    effect: ['Tt'],
  },
  M: {
    name: 'Horse Semen',
    rank: '13',
    price: 9,
    effect: ['Lf'],
  },
  N: {
    name: 'Mega Bean',
    rank: '8',
    price: 7,
    effect: ['Fo'],
  },
  O: {
    name: 'Addy',
    rank: '12',
    price: 9,
    effect: ['Tp'],
  },
  P: {
    name: 'Battery',
    rank: '10',
    price: 8,
    effect: ['Be'],
  },
};
