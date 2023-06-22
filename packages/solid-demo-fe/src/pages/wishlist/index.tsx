import { Product } from '@medusajs/medusa';
import {
  Box,
  Button,
  Container,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Typography,
  styled,
} from '@suid/material';
import { For, Show, createEffect, createSignal } from 'solid-js';
import { getProductPrice, addProduct } from '../../utils/productHelper';
import { CartAction, dispatchCart } from '../../store';
import { useNavigate } from '@solidjs/router';
import { ShoppingCartOutlined } from '@suid/icons-material';
import WishlistEmptyIcon from '../../assets/images/empty-wishlist.png';

const columns = [
  { title: 'Image', align: 'center' },
  { title: 'Product Name', align: 'left' },
  { title: 'Price', align: 'center' },
  { title: 'AVAILABILITY', align: 'center' },
  { title: 'Action', align: 'center' },
];

const EmptyWishlist = () => {
  return (
    <EmptyBoxStyled>
      <img src={WishlistEmptyIcon} alt='wishlist-empty' />
      <EmptyHeadingStyled variant='h4'>Wishlist is Empty</EmptyHeadingStyled>
      <EmptyDesStyled>Explore More Shortlist Some Items.</EmptyDesStyled>
    </EmptyBoxStyled>
  );
};
const Wishlist = () => {
  const navigate = useNavigate();
  const [wishlistItems, setWishlistItems] = createSignal<Product[]>([]);

  createEffect(() => {
    const products: Product[] = JSON.parse(localStorage.getItem('wishlistItems') || '[]') || [];
    setWishlistItems(products);
  });

  const removeItem = (product: Product) => {
    const wishlistItems: Product[] = JSON.parse(localStorage.getItem('wishlistItems') ?? '[]') || [];
    const newWishlistItems = wishlistItems.filter((item) => item.id !== product.id);

    setWishlistItems(newWishlistItems);
    localStorage.setItem('wishlistItems', JSON.stringify(newWishlistItems));
  };

  const addToCart = async (product: Product) => {
    await addProduct(product.variants[0].id, 1, (updated) => dispatchCart(CartAction.SetCart, updated));
    removeItem(product);
    navigate('/shopping-cart');
  };

  const checkIsInstock = (quantity: number) => (quantity > 0 ? true : false);

  return (
    <>
      <Box>
        <Container>
          <Show when={wishlistItems.length > 0} fallback={<EmptyWishlist />}>
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
                  <For each={wishlistItems()}>
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
                          <Typography fontSize='1.25rem'>{getProductPrice(item.variants[0])}</Typography>
                        </TableCell>
                        <TableCell align='center'>
                          <Typography>
                            {checkIsInstock(item.variants[0]?.inventory_quantity) ? 'In Stock' : 'Out Of Stock'}
                          </Typography>
                        </TableCell>
                        <TableCell align='center'>
                          <ButtonStyled onClick={() => removeItem(item)}>&#10006;</ButtonStyled>
                          <ButtonStyled
                            onClick={() => addToCart(item)}
                            disabled={!checkIsInstock(item.variants[0]?.inventory_quantity)}>
                            <ShoppingCartOutlined />
                          </ButtonStyled>
                        </TableCell>
                      </TableRow>
                    )}
                  </For>
                </TableBody>
              </Table>
            </TableContainer>
          </Show>
        </Container>
      </Box>
    </>
  );
};

const ProductImage = styled('img')({
  width: 66,
  borderRadius: 4,
});

const ButtonStyled = styled(Button)({
  minWidth: '30px',
  padding: '0',
  color: '#777777',
});

const EmptyBoxStyled = styled('div')({
  display: 'flex',
  flexDirection: 'column',
  padding: '70px 0',
  width: 'auto',
  alignItems: 'center',
});

const EmptyHeadingStyled = styled(Typography)({
  fontSize: '24px',
  fontWeight: 400,
  color: '#777777',
  letterSpacing: '0.03em',
  marginTop: '1.5rem',
  marginBottom: '0.5rem',
});

const EmptyDesStyled = styled(Typography)({
  fontSize: '18px',
  fontWeight: 400,
  color: '#777777',
  letterSpacing: '0.03em',
});

export default Wishlist;
