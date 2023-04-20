import { Cart } from '@medusajs/medusa/dist/models/cart';

export type ICart = Omit<Cart, 'refundable_amount' | 'refunded_total'>;
