//ProductList.jsx
import { createEffect, createSignal, For } from 'solid-js';
import { A } from '@solidjs/router';
import { Box, Typography, Link } from '@suid/material';
import { medusaClient } from '../utils/medusaClient';
import { IProduct } from '../types';

function ProductList() {
  const [products, setProducts] = createSignal<IProduct[]>([]);

  createEffect(() => {
    const fetchProducts = async () => {
      const res = await medusaClient.products.list();
      setProducts(res.products);
    };
    fetchProducts();
  });

  return (
    <>
      <Box
        sx={{
          marginTop: '2rem',
          paddingLeft: { lg: '4rem', xs: '1.5rem' },
          paddingRight: { lg: '4rem', xs: '1.5rem' },
        }}
        component='section'>
        <Typography
          sx={{
            textAlign: 'center',
            fontSize: '1.5rem',
            marginBottom: '2rem',
          }}>
          Featured Products
        </Typography>

        <Box sx={{ margin: '0 2rem' }}>
          <Box
            sx={{
              display: 'grid',
              gridTemplateColumns: '1fr 1fr 1fr 1fr',
              gap: '2rem',
            }}>
            <For
              each={products()}
              children={(product) => (
                <Box
                  component='div'
                  sx={{
                    backgroundColor: 'rgb(231, 231, 231)',
                    height: '350px',
                    padding: '0.5rem',
                  }}>
                  <Box component='div' sx={{ height: '12rem' }}>
                    <Box
                      component='img'
                      src={product?.thumbnail}
                      sx={{
                        height: '12rem',
                        width: '100%',
                        objectFit: 'cover',
                      }}
                    />
                  </Box>
                  <Typography
                    sx={{
                      padding: '1rem 0',
                      textAlign: 'center',
                      fontWeight: '600',
                    }}>
                    {product?.title}
                  </Typography>
                  <Typography sx={{ textAlign: 'center' }}>
                    &euro; {product?.variants[0]?.prices[0]?.amount / 100}
                  </Typography>
                  <Box sx={{ textAlign: 'center' }}>
                    <Link underline='always'>
                      <A href={`/products/${product.id}`}>See product</A>
                    </Link>
                  </Box>
                </Box>
              )}></For>
          </Box>
        </Box>
      </Box>
    </>
  );
}

export { ProductList };
