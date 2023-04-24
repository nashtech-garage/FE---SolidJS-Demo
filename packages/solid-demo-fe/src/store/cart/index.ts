import { createStore } from 'solid-js/store';
import { medusaClient } from '../../utils';
import { CartAction, CartState } from './types';

const initialState: CartState = {
  cart: undefined,
  loading: false,
};

const [cartStore, setCart] = createStore(initialState);

async function getInitialCart() {
  setCart('loading', true);

  const cartId = localStorage.getItem('cartId');
  if (cartId) {
    const { cart } = await medusaClient.carts.retrieve(cartId);
    setCart({
      cart,
      loading: false,
    })
  }
}

async function dispatchCart(type: CartAction, payload?: any) {
  switch (type) {
    case CartAction.GetCart: {
      getInitialCart()
      break;
    }
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
