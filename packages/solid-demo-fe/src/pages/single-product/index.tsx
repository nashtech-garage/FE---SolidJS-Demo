import { useParams } from '@solidjs/router';
import { createEffect, createSignal } from 'solid-js';
import { Container, Box, Grid, IconButton, Button, Typography } from '@suid/material';
import { createQuery } from '@tanstack/solid-query'

import { Footer } from '../../layouts/Footer';
import { medusaClient } from '../../utils';
import { getProductPrice } from '../../utils/productHelper';

const addProduct = async (cartId: string, product: any) => {
  const { cart } = await medusaClient.carts.lineItems.create(cartId, {
    variant_id: product?.variants[0].id,
    quantity: 1,
  });
  console.log(cart);
  localStorage.setItem('cartCount', cart.items.length);
  setTimeout(() => window.location.reload(), 5000);
};

function SingleProduct() {
  const [regionId, setRegionId] = createSignal<string>('');
  const params = useParams();
  const productId = params.productId;
  if (!productId) {
    return null;
  }
  const productQuery = createQuery(() => ['product-detail-' + productId], () => medusaClient.products.retrieve(productId))

  createEffect(() => {
    const fetchRegions = async () => {
      const results = await medusaClient.regions.list();
      setRegionId(results.regions[1].id);
    };

    fetchRegions();
  });

  const handleAddToCart = async () => {
    const cartId = localStorage.getItem('cartId');

    if (cartId) {
      addProduct(cartId, productQuery.data?.product);
    } else {
      const { cart } = await medusaClient.carts.create({ region_id: regionId() });
      localStorage.setItem('cartId', cart.id);
      addProduct(cart.id, productQuery.data?.product);
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
                alt={productQuery.data?.title}
                src={productQuery.data?.product?.thumbnail || ''}
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
                {productQuery.data?.product?.title}
              </Typography>
              <Typography mb={2}>{getProductPrice(productQuery.data?.product)}</Typography>
              <Typography mb={2}>{productQuery.data?.product?.description}</Typography>
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
