import { createSignal, onMount, Component, JSX } from 'solid-js';

import { medusaClient } from '../utils/medusaClient';
import { CartContext } from '../contexts';
import { ICart } from '../types/Cart';

interface CartProviderProps {
  children: JSX.Element;
}

const CartProvider: Component<CartProviderProps> = (props) => {
  const [cart, setCart] = createSignal<ICart>();

  onMount(() => {
    const getCart = async () => {
      const cartId = localStorage.getItem('cartId');
      if (cartId) {
        const { cart } = await medusaClient.carts.retrieve(cartId);
        setCart(cart);
      }
    };

    getCart();
  });

  return <CartContext.Provider value={{ cart, updateCart: setCart }}>{props.children}</CartContext.Provider>;
};

export { CartProvider };
