import { For, createEffect, createSignal } from 'solid-js';
import { useParams } from '@solidjs/router';
import { Box, Grid, Button, Typography, styled, Container, Divider } from '@suid/material';
import { createQuery } from '@tanstack/solid-query';
import { ProductVariant } from '@medusajs/medusa';

import { medusaClient } from '../../utils';
import { addProduct, getProductPrice } from '../../utils/productHelper';
import { PageTitleWrapper } from '../../components';
import CounterButton from '../../components/CounterButton';
import { CartAction, dispatchCart } from '../../store';

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

  const [variant, setVariant] = createSignal<ProductVariant>();
  const [quantity, setQuantity] = createSignal(1);

  const handleAddToCart = async () => {
    const variantId = variant()?.id
    if (variantId) {
      await addProduct(variantId, quantity(), (newCart) => dispatchCart(CartAction.SetCart, newCart));
    }
  };

  const isSizeButtonActive = (variantId: string) => {
    if (variant() && variant()?.id === variantId) return true;
    return false;
  };

  const getOriginalPrice = () => {
    const prices = variant()?.prices
    if (prices && prices.length > 1) { 
      const price = prices[1].amount / 100;
      return '$' + (price * 0.1111 + price).toFixed(2);
    }
    return ''
  };

  const product = () => {
    return productQuery.data?.product
  }

  createEffect(() => {
    const variants = product()?.variants;
    if (variants && variants.length > 0) {
      setVariant(variants[0]);
    }
  });

  return (
    <Container>
      <PageTitleWrapper title={product()?.title} />
      <Grid container spacing={2}>
        <Grid item xs={4}>
          <Box>
            <Box
              component='img'
              style={{ width: '100%', position: 'relative' }}
              alt={product()?.title}
              src={product()?.thumbnail || ''}
            />
          </Box>
        </Grid>
        <Grid item xs={8}>
          <Box sx={{ marginTop: '2rem' }}>
            <Typography variant='h6' color='#222' textTransform='uppercase'>
              {product()?.title}
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
                  each={product()?.variants}
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
              <CounterButton quantity={quantity()} onChangeQuantity={setQuantity} />
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
              {product()?.description}
            </Typography>
          </Box>
        </Grid>
      </Grid>
    </Container>
  );
}

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

const SectionTitle = styled(Typography)({
  color: '#222',
  fontSize: 13,
  fontWeight: '700',
});

export default SingleProduct;
