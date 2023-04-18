import { createSignal, createContext, onMount, useContext } from 'solid-js';
import { medusaClient } from '../utils/medusaClient';

type Cart = {
  id: string | undefined;
  items: any[];
};

type CartStoreType = {
  cart: any;
  updateCart: (newCart: Cart) => void;
};

const CartContext = createContext<CartStoreType | undefined>(undefined);

export function CartProvider(props: { children: any }) {
  const [cart, setCart] = createSignal<Cart>({
    id: undefined,
    items: [],
  });

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

    getCart();
  });

  return (
    <CartContext.Provider
      value={{
        cart,
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
