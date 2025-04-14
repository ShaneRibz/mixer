export type EffectCode =
  | 'Ag'
  | 'At'
  | 'Ba'
  | 'Be'
  | 'Ca'
  | 'Cd'
  | 'Cy'
  | 'Di'
  | 'El'
  | 'En'
  | 'Eu'
  | 'Ex'
  | 'Fc'
  | 'Fo'
  | 'Gi'
  | 'Gl'
  | 'Je'
  | 'La'
  | 'Lf'
  | 'Mu'
  | 'Pa'
  | 'Re'
  | 'Sc'
  | 'Se'
  | 'Sh'
  | 'Si'
  | 'Sl'
  | 'Sm'
  | 'Sn'
  | 'Sp'
  | 'To'
  | 'Tp'
  | 'Tt'
  | 'Zo';

export type SubstanceCode =
  | 'A'
  | 'B'
  | 'C'
  | 'D'
  | 'E'
  | 'F'
  | 'G'
  | 'H'
  | 'I'
  | 'J'
  | 'K'
  | 'L'
  | 'M'
  | 'N'
  | 'O'
  | 'P';

export type ProductType =
  | 'OG Kush'
  | 'Sour Diesel'
  | 'Green Crack'
  | 'Grandaddy Purple'
  | 'Meth'
  | 'Cocaine';

export type RankCode =
  | '1'
  | '2'
  | '3'
  | '4'
  | '5'
  | '6'
  | '7'
  | '8'
  | '9'
  | '10'
  | '11'
  | '12'
  | '13';

export interface EffectData {
  name: string;
  price: number;
  color: string;
}

export interface SubstanceData {
  name: string;
  rank: RankCode;
  price: number;
  effect: EffectCode[];
}

export interface ProductData {
  price: number;
  effects: EffectCode[];
  abbreviation: string;
}

export interface EffectRule {
  ifPresent: EffectCode[];
  ifNotPresent: EffectCode[];
  replace: Partial<Record<EffectCode, EffectCode>>;
}

export interface MixResult {
  effects: EffectCode[];
  cost: number;
  sellPrice: number;
  profit: number;
  profitMargin: number;
}

export interface MixState {
  product: ProductType;
  substances: SubstanceCode[];
}
