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
    });
  }
}

async function dispatchCart(type: CartAction, payload?: any) {
  switch (type) {
    case CartAction.GetCart: {
      getInitialCart();
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
    case CartAction.CompleteCart: {
      if (!cartStore.cart?.id) return;
      const { form, onOpenNoti } = payload;
      setCart('loading', true);

      const billingAddress = {
        first_name: form.firstName,
        last_name: form.lastName,
        phone: form.phone,
        address_1: form.address,
        address_2: '',
        city: form.city,
        country_code: form.countryCode,
        province: form.province,
        postal_code: form.postalCode,
      };

      const tempCart = {
        billing_address: billingAddress,
        email: form.email,
      };

      try {
        const res = await medusaClient.carts.update(cartStore.cart.id, tempCart);
        if (res.response.status === 200) {
          console.log(res);
          if (!cartStore.cart?.payment_session) {
            // create payment session
            try {
              const createPaySessionRes = await medusaClient.carts.createPaymentSessions(cartStore.cart.id);
              if (createPaySessionRes.response.status === 200) {
                console.log('create payment session success');
              }
            } catch (error: any) {
              console.log('create payment session error');
            }
          } else {
            // complete card
            try {
              const completeCartRes = await medusaClient.carts.complete(cartStore.cart.id);
              if (completeCartRes.response.status === 200) {
                console.log('complete cart success');
                onOpenNoti(true);
                const cartId = localStorage.getItem('cartId');
                if (cartStore.cart.id === cartId) {
                  localStorage.removeItem('cartId');
                }
              }
            } catch (error: any) {
              console.log('complete cart error');
            }
          }
        }
      } catch (error: any) {
        onOpenNoti(false);
        throw new Error(error?.response?.data);
      } finally {
        setCart('loading', false);
      }

      break;
    }

    default:
      break;
  }
}

export { cartStore, dispatchCart, CartAction };
