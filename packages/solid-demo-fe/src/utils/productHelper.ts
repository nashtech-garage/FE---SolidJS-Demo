import { ProductVariant } from '@medusajs/medusa';
import { ICart } from '../types/Cart';
import { medusaClient } from './medusaClient';
import { BASE_API_URL } from '../constants';

export function formatPrice(price?: number | null) {
  if (!price) return '';
  return '$' + (price / 100).toFixed(2);
}

export function getProductPrice(variant?: ProductVariant) {
  const usdPriceIndex = 1;
  if (variant) {
    return formatPrice(variant.prices[usdPriceIndex].amount);
  }
  return '';
}

async function createCart() {
  try {
    const { regions } = await medusaClient.regions.list();

    const regionId = regions[0]?.id;
    if (regionId) {
      const { cart } = await medusaClient.carts.create({ region_id: regionId });
      localStorage.setItem('cartId', cart.id);
      return cart;
    }
  } catch (error) {
    console.log('Create cart error:', error);
  }
}

export async function addProduct(variantId: string, quantity: number, onCartChange: (cart: ICart) => void) {
  let cartId = localStorage.getItem('cartId');

  // Init cart
  if (!cartId) {
    const cartCreated = await createCart();
    if (cartCreated) {
      cartId = cartCreated?.id;
    }
  }

  if (cartId) {
    try {
      const { cart: updatedCart } = await medusaClient.carts.lineItems.create(cartId, {
        variant_id: variantId,
        quantity,
      });
      onCartChange(updatedCart);
    } catch (error) {
      console.log('Add product error:', error);
    }
  }
}

export async function getFilterOptions() {
  const res = await fetch(`${BASE_API_URL}/store/option-filter`);
  return res.json();
}

export async function filterProduct(params: string) {
  const res = await fetch(`${BASE_API_URL}/store/product-filter?${params}`);
  return res.json();
}
