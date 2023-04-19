import { medusaClient } from './medusaClient';

export function getProductPrice(variant?: { prices: any[] }) {
  const usdPriceIndex = 1;
  if (variant) {
    const price = variant.prices[usdPriceIndex].amount / 100;
    return '$' + price.toFixed(2);
  }
  return '';
}

async function createCart() {
  try {
    const { regions } = await medusaClient.regions.list();
    console.log({ regions })

    const regionId = regions[0]?.id
    if (regionId) {
      const { cart } = await medusaClient.carts.create({ region_id: regionId });
      localStorage.setItem('cartId', cart.id);
      return cart;
    }
  } catch (error) {
    console.log('Create cart error:', error);
  }
}

export async function addProduct(variantId: string, quantity: number, onCartChange: (cart: any) => void) {
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
