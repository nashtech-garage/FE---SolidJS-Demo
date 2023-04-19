import { Box, Button, Container, Table, TableBody, TableHead, TableRow, TableCell } from '@suid/material';
import PageTitleWrapper from '../../components/PageTitleWrapper';
import { useCart } from '../../components/CartProvider';
import { For, createEffect } from 'solid-js';
import TableHeadCell from '../../components/Table/TableHeadCell';

function ShoppingCart() {
  const { cart } = useCart();

  createEffect(() => {
    console.log(cart());
  });

  return (
    <Box>
      <PageTitleWrapper title='Cart' />

      <Container>
        <Table>
          <TableHead>
            <TableRow>
              <TableHeadCell>Image</TableHeadCell>
              <TableHeadCell>Product Name</TableHeadCell>
              <TableHeadCell>Price</TableHeadCell>
              <TableHeadCell>Quantity</TableHeadCell>
              <TableHeadCell>Action</TableHeadCell>
              <TableHeadCell>Total</TableHeadCell>
            </TableRow>
          </TableHead>
          <TableBody>
            <For each={cart().items}>
              {(item) => (
                <TableRow>
                  <TableCell>
                    <img width={66} src={item.thumbnail} />
                  </TableCell>
                  <TableCell>{item.title}</TableCell>
                  <TableCell>{item.unit_price}</TableCell>
                  <TableCell>{item.quantity}</TableCell>
                  <TableCell>
                    <Button>&#10006;</Button>
                  </TableCell>
                  <TableCell>${item.total}</TableCell>
                </TableRow>
              )}
            </For>
          </TableBody>
        </Table>
      </Container>
    </Box>
  );
}

export default ShoppingCart;
