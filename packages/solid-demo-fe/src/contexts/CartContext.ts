import { createContext, useContext, Accessor } from 'solid-js';

export type CartType = {
  id: string | undefined;
  items: any[];
};

export interface ICartStore {
  cart: Accessor<CartType>;
  regionId: Accessor<string>;
  updateCart: (newCart: CartType) => void;
}

export const CartContext = createContext<ICartStore>();

export const useCart = () => {
  const cartContext = useContext(CartContext);

  if (!cartContext) {
    throw new Error('useCart must be used within a CartProvider');
  }

  return cartContext;
};
