import { Cart } from '@medusajs/medusa';

export type ICart = Omit<Cart, 'refundable_amount' | 'refunded_total'>;
