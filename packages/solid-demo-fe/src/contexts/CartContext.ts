import { createContext, useContext, Accessor } from 'solid-js';
import { ICart } from '../types/Cart';

export interface ICartStore {
  cart: Accessor<ICart | undefined>;
  updateCart: (newCart: ICart) => void;
}

export const CartContext = createContext<ICartStore>();

export const useCart = () => {
  const cartContext = useContext(CartContext);

  if (!cartContext) {
    throw new Error('useCart must be used within a CartProvider');
  }

  return cartContext;
};
