import { ICart } from "../../types/Cart";

export enum CartAction {
  GetCart,
  SetCart,
  ClearCart,
}

export interface CartState {
  cart?: ICart;
  loading: boolean;
}