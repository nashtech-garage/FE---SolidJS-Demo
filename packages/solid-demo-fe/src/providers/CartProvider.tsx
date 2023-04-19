import { createSignal, onMount, createMemo, Component, JSX } from 'solid-js';

import { medusaClient } from '../utils/medusaClient';
import { CartType, CartContext } from '../contexts';

interface CartProviderProps {
  children: JSX.Element;
}

const CartProvider: Component<CartProviderProps> = (props) => {
  const [cart, setCart] = createSignal<CartType>({
    id: undefined,
    items: [],
  });
  const [regionId, setRegionId] = createSignal<string>('');

  onMount(() => {
    const getCart = async () => {
      const cartId = localStorage.getItem('cartId');
      if (cartId) {
        const { cart } = await medusaClient.carts.retrieve(cartId);
        setCart({
          id: cartId,
          items: cart.items,
        });
      }
    };

    const fetchRegions = async () => {
      const results = await medusaClient.regions.list();
      setRegionId(results.regions[1].id);
    };

    fetchRegions();
    getCart();
  });

  const valueProvider = createMemo(() => ({
    cart,
    regionId,
    updateCart: setCart,
  }));

  return <CartContext.Provider value={valueProvider()}>{props.children}</CartContext.Provider>;
};

export { CartProvider };
