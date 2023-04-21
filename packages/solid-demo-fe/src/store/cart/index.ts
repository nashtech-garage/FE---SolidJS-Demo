import { createStore } from 'solid-js/store';
import { ICart } from '../../types/Cart';

enum CartAction {
  SetCart,
  ClearCart,
}

interface CartState {
  cart?: ICart;
  loading: boolean;
}

const initialState: CartState = {
  cart: undefined,
  loading: false,
};

const [cartStore, setCart] = createStore(initialState);

function dispatchCart(type: CartAction, payload: any) {
  switch (type) {
    case CartAction.SetCart: {
      setCart('cart', payload);
      break;
    }
    case CartAction.ClearCart: {
      setCart('cart', undefined);
      break;
    }

    default:
      break;
  }
}

export { cartStore, dispatchCart, CartAction };
