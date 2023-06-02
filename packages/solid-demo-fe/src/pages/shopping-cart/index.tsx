import { For } from 'solid-js';
import {
  Box,
  Button,
  Container,
  Table,
  TableBody,
  TableHead,
  TableRow,
  TableCell,
  Typography,
  TableContainer,
  styled,
} from '@suid/material';
import { LineItem } from '@medusajs/medusa';
import { Link, useNavigate } from '@solidjs/router';

import { PageTitleWrapper } from '../../components';
import { CartAction, cartStore, dispatchCart } from '../../store';
import { medusaClient } from '../../utils';
import CounterButton from '../../components/CounterButton';
import { formatPrice } from '../../utils/productHelper';

interface Column {
  title: string;
  align?: 'left' | 'right' | 'center';
}

const columns: Column[] = [
  { title: 'Image', align: 'center' },
  { title: 'Product Name', align: 'left' },
  { title: 'Price', align: 'center' },
  { title: 'Quantity', align: 'center' },
  { title: 'Action', align: 'center' },
  { title: 'Total', align: 'center' },
];

function ShoppingCart() {
  const cart = () => cartStore.cart;
  const navigate = useNavigate();
  const removeItem = async (item: LineItem) => {
    try {
      const { cart } = await medusaClient.carts.lineItems.delete(item.cart_id, item.id);
      dispatchCart(CartAction.SetCart, cart);
    } catch (error) {
      console.log('Remove item error:', error);
    }
  };

  const onChangeQuantity = async (item: LineItem, nextQuantity: number) => {
    try {
      const { cart } = await medusaClient.carts.lineItems.update(item.cart_id, item.id, {
        quantity: nextQuantity,
      });
      dispatchCart(CartAction.SetCart, cart);
    } catch (error) {
      console.log('Update quantity error:', error);
    }
  };

  const handleCheckout = () => {
    navigate('/check-out');
    console.log(cart());
  };

  return (
    <Box>
      <PageTitleWrapper title='CART' />
      <Container>
        <TableContainer>
          <Table>
            <TableHead>
              <TableRow>
                <For each={columns}>
                  {(column) => (
                    <TableCell align={column.align}>
                      <Typography color='#222' textTransform='uppercase' fontSize='0.9rem' fontWeight={700}>
                        {column.title}
                      </Typography>
                    </TableCell>
                  )}
                </For>
              </TableRow>
            </TableHead>
            <TableBody>
              <For each={cart()?.items}>
                {(item) => (
                  <TableRow>
                    <TableCell align='center'>
                      <ProductImage src={item.thumbnail || undefined} />
                    </TableCell>
                    <TableCell align='left'>
                      <Typography fontSize='0.8rem' color='#777'>
                        {item.title}
                      </Typography>
                    </TableCell>
                    <TableCell align='center'>
                      <Typography fontSize='1.25rem'>{formatPrice(item.unit_price)}</Typography>
                    </TableCell>
                    <TableCell align='center'>
                      <CounterButton
                        quantity={item.quantity}
                        onChangeQuantity={(number) => onChangeQuantity(item, number)}
                      />
                    </TableCell>
                    <TableCell align='center'>
                      <Button onClick={() => removeItem(item)}>&#10006;</Button>
                    </TableCell>
                    <TableCell align='center'>
                      <Typography fontSize='1.25rem' color='primary'>
                        {formatPrice(item.total)}
                      </Typography>
                    </TableCell>
                  </TableRow>
                )}
              </For>
            </TableBody>
          </Table>
        </TableContainer>
        <TableFooter>
          <Box>
            <Link href='/products'>
              <Button size='large' variant='contained'>
                Continue Shopping
              </Button>
            </Link>
          </Box>
          <CheckoutWrapper>
            <Typography
              sx={{
                display: 'flex',
                alignItems: 'center',
              }}>
              Total Price:
              <Typography variant='h5' ml={2} sx={{ display: 'inline' }}>
                {formatPrice(cart()?.total)}
              </Typography>
            </Typography>
            <Button sx={{ marginTop: 1 }} variant='contained' onClick={handleCheckout}>
              Check out
            </Button>
          </CheckoutWrapper>
        </TableFooter>
      </Container>
    </Box>
  );
}

const ProductImage = styled('img')({
  width: 66,
  borderRadius: 4,
});

const TableFooter = styled(Box)({
  display: 'flex',
  justifyContent: 'space-between',
  alignItems: 'flex-end',
  paddingTop: 16,
  paddingBottom: 16,
});

const CheckoutWrapper = styled(Box)({
  textAlign: 'right',
});

export default ShoppingCart;
