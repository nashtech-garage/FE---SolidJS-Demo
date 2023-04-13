import { useParams } from '@solidjs/router';
import { createEffect, createSignal } from 'solid-js';
import { Container, Box, Grid, IconButton, Button, Typography } from '@suid/material';

import { Footer } from '../../layouts/Footer';
import { medusaClient } from '../../utils';

const addProduct = async (cartId: string, product: any) => {
  const { cart } = await medusaClient.carts.lineItems.create(cartId, {
    variant_id: product()?.variants[0].id,
    quantity: 1,
  });
  console.log(cart);
  localStorage.setItem('cartCount', cart.items.length);
  setTimeout(() => window.location.reload(), 5000);
};

function SingleProduct() {
  const [productItem, setProductItem] = createSignal<any>();
  const [regionId, setRegionId] = createSignal<string>('');
  const params = useParams();
  const productId = params.productId;
  if (!productId) {
    return null;
  }
  createEffect(() => {
    const fetchSingleProduct = async () => {
      const results = await medusaClient.products.retrieve(productId);
      setProductItem(results.product);
    };

    const fetchRegions = async () => {
      const results = await medusaClient.regions.list();
      setRegionId(results.regions[1].id);
    };

    fetchSingleProduct();
    fetchRegions();
  });

  const handleAddToCart = async () => {
    const cartId = localStorage.getItem('cartId');

    if (cartId) {
      addProduct(cartId, productItem);
    } else {
      const { cart } = await medusaClient.carts.create({ region_id: regionId });
      localStorage.setItem('cartId', cart.id);
      addProduct(cart.id, productItem);
    }
  };

  return (
    <>
      <Container maxWidth='sm' sx={{ marginBlockStart: 8, padding: 3 }}>
        <Grid container spacing={2}>
          <Grid item xs={6}>
            <Box>
              <Box
                component='img'
                style={{ width: '100%', position: 'relative' }}
                alt={productItem()?.title}
                src={productItem()?.thumbnail}
              />
            </Box>
          </Grid>
          <Grid item xs={6}>
            <Box
              sx={{
                marginTop: '2rem',
                display: 'flex',
                justifyContent: 'flex-start',
                alignItems: 'flex-start',
                flexDirection: 'column',
              }}>
              <Typography variant='h5' mb={2}>
                {productItem()?.title}
              </Typography>
              <Typography mb={2}>&euro; {productItem()?.variants[0].prices[0].amount / 100}</Typography>
              <Typography mb={2}>{productItem()?.description}</Typography>
              <IconButton>
                <Button onClick={handleAddToCart} variant='contained' color='primary'>
                  Add to cart
                </Button>
              </IconButton>
            </Box>
          </Grid>
        </Grid>
      </Container>
      <Footer />
    </>
  );
}

export default SingleProduct;
