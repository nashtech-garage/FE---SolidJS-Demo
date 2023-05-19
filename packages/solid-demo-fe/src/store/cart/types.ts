import { ICart } from "../../types/Cart";

export enum CartAction {
  GetCart,
  SetCart,
  ClearCart,
  CompleteCart
}

export interface CartState {
  cart?: ICart;
  loading: boolean;
}