import { medusaClient } from './medusaClient';

export function getProductPrice(product: any) {
  const price = product?.variants[0].prices[0].amount / 100;
  return '$' + price.toFixed(2);
}

async function createCart(regionId: string) {
  try {
    const { cart } = await medusaClient.carts.create({ region_id: regionId });
    localStorage.setItem('cartId', cart.id);
    return cart;
  } catch (error) {
    console.log('Create cart error:', error);
  }
}

export async function addProduct(product: any, regionId: string, onCartChange: (cart: any) => void) {
  let cartId = localStorage.getItem('cartId');

  // Init cart
  if (!cartId) {
    const cartCreated = await createCart(regionId);
    if (cartCreated) {
      cartId = cartCreated?.id
    }
  }

  if (cartId) {
    try {
      const { cart: updatedCart } = await medusaClient.carts.lineItems.create(cartId, {
        variant_id: product?.variants[0].id,
        quantity: 1,
      });
      onCartChange(updatedCart);
    } catch (error) {
      console.log('Add product error:', error);
    }
  } else {
  }
}
