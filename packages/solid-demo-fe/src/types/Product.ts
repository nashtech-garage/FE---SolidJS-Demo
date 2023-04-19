import { ICommon } from './common';

export interface IPrice extends ICommon {
  currency_code: string;
  amount: number;
  variant_id: string;
}

export interface IVariant extends ICommon {
  prices: IPrice[];
  title: string;
  inventory_quantity: number;
}

export interface IProductType extends ICommon {
  value: string;
  metadata: Record<string, unknown>;
}

export interface IProduct extends ICommon {
  title: string;
  thumbnail: string;
  description: string;
  variants: IVariant[];
}
