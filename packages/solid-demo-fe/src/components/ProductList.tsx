//ProductList.jsx
import { createEffect, createSignal, For } from 'solid-js';
import { Box, Typography, Link } from '@suid/material';
import { medusaClient } from '../utils/medusaClient';
import { IProduct } from '../types';
import ProductItem from './ProductItem/ProductItem';

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
              children={(product) => <ProductItem product={product} />}
            />
          </Box>
        </Box>
      </Box>
    </>
  );
}

export { ProductList };
