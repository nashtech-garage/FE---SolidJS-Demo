import { For, createEffect, createSignal } from 'solid-js';
import { useParams } from '@solidjs/router';
import { Box, Grid, Button, Typography, styled, Container, Divider, ButtonGroup } from '@suid/material';
import { createQuery } from '@tanstack/solid-query';

import { useCart } from '../../contexts';
import { medusaClient } from '../../utils';
import { addProduct, getProductPrice } from '../../utils/productHelper';
import { PageTitleWrapper } from '../../components';

function SingleProduct() {
  const params = useParams();
  const productId = params.productId;
  if (!productId) {
    return null;
  }

  const productQuery = createQuery(
    () => ['product-detail-' + productId],
    () => medusaClient.products.retrieve(productId)
  );

  const { updateCart } = useCart();
  const [variant, setVariant] = createSignal<any>();
  const [quantity, setQuantity] = createSignal(1);

  const handleAddToCart = async () => {
    if (variant()) {
      addProduct(variant().id, quantity(), updateCart);
    }
  };

  const isSizeButtonActive = (variantId: string) => {
    if (variant() && variant()?.id === variantId) return true;
    return false;
  };

  const decrement = () => {
    if (quantity() === 1) return;
    setQuantity(quantity() - 1);
  };

  const increment = () => setQuantity(quantity() + 1);

  const getOriginalPrice = () => {
    if (!variant()) return '';

    const price = variant().prices[1].amount / 100;
    return '$' + (price * 0.1111 + price).toFixed(2);
  };

  createEffect(() => {
    const variants = productQuery.data?.product.variants;
    if (variants && variants.length > 0) {
      setVariant(variants[0]);
    }
  });

  return (
    <Container>
      <PageTitleWrapper title={productQuery.data?.product?.title} />
      <Grid container spacing={2}>
        <Grid item xs={4}>
          <Box>
            <Box
              component='img'
              style={{ width: '100%', position: 'relative' }}
              alt={productQuery.data?.product?.title}
              src={productQuery.data?.product?.thumbnail || ''}
            />
          </Box>
        </Grid>
        <Grid item xs={8}>
          <Box sx={{ marginTop: '2rem' }}>
            <Typography variant='h6' color='#222' textTransform='uppercase'>
              {productQuery.data?.product?.title}
            </Typography>
            <Box>
              <Typography color='#777' variant='caption' sx={{ textDecoration: 'line-through' }} fontSize='1rem'>
                {getOriginalPrice()}
              </Typography>
              <Typography variant='caption' color='#ff4c3b' fontSize='1rem'>
                &nbsp;10% Off
              </Typography>
            </Box>
            <Typography fontSize={'1.5rem'} color='#222'>
              {getProductPrice(variant())}
            </Typography>
            <Divider />
            <QuantityBox>
              <SectionTitle mb={1}>Select Size</SectionTitle>
              <ButtonSizeGroup>
                <For
                  each={productQuery.data?.product.variants}
                  children={(item) => (
                    <SizeButton
                      onClick={() => setVariant(item)}
                      class={isSizeButtonActive(item.id) ? 'active' : ''}
                      variant='outlined'
                      color='info'>
                      {item.title}
                    </SizeButton>
                  )}
                />
              </ButtonSizeGroup>
              <SectionTitle marginY={1}>Quantity</SectionTitle>
              <ButtonGroup>
                <Button onClick={decrement} color='info'>
                  -
                </Button>
                <QuantityButton disabled>{quantity()}</QuantityButton>
                <Button onClick={increment} color='info'>
                  +
                </Button>
              </ButtonGroup>
            </QuantityBox>
            <Box sx={{ marginBottom: 3 }}>
              <Button onClick={handleAddToCart} variant='contained' color='primary' sx={{ marginRight: 1 }}>
                Add to cart
              </Button>
              <Button variant='contained' color='primary'>
                Buy Now
              </Button>
            </Box>
            <Divider />
            <SectionTitle mt={1}>Product Details</SectionTitle>
            <Typography color='#777' variant='caption'>
              {productQuery.data?.product?.description}
            </Typography>
          </Box>
        </Grid>
      </Grid>
    </Container>
  );
}

const ProductTitleWrapper = styled(Box)({
  backgroundColor: '#f8f8f8',
  padding: 32,
  marginBottom: 32,
});

const QuantityBox = styled(Box)({
  paddingTop: 16,
  paddingBottom: 20,
});

const ButtonSizeGroup = styled(Box)({
  display: 'inline-flex',
  gap: 8,

  '& > button': {
    minWidth: 'unset',
    minHeight: 'unset',
    width: '40px',
    height: '40px',
  },
});

const SizeButton = styled(Button)({
  '&.active': {
    backgroundColor: '#c2b9b9',
    color: '#FFF',
  },
});

const QuantityButton = styled(Button)({
  '&.Mui-disabled': {
    color: '#000',
  },
});

const SectionTitle = styled(Typography)({
  color: '#222',
  fontSize: 13,
  fontWeight: '700',
});

export default SingleProduct;
