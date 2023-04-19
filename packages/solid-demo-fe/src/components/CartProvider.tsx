import { createSignal, createContext, onMount, useContext, Accessor } from 'solid-js';
import { medusaClient } from '../utils/medusaClient';

type Cart = {
  id: string | undefined;
  items: any[];
};

type CartStoreType = {
  cart: Accessor<Cart>;
  regionId: Accessor<string>
  updateCart: (newCart: Cart) => void;
};

const CartContext = createContext<CartStoreType | undefined>();

export function CartProvider(props: { children: any }) {
  const [cart, setCart] = createSignal<Cart>({
    id: undefined,
    items: [],
  });
  const [regionId, setRegionId] = createSignal<string>('')

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

  return (
    <CartContext.Provider
      value={{
        cart,
        regionId,
        updateCart: setCart,
      }}>
      {props.children}
    </CartContext.Provider>
  );
}

export function useCart() {
  const cartContext = useContext(CartContext);

  if (!cartContext) {
    throw new Error('useCart must be used within a CartProvider');
  }

  return cartContext;
}
