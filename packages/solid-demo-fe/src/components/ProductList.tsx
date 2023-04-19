//ProductList.jsx
import { Box, Typography } from '@suid/material';
import { medusaClient } from '../utils/medusaClient';
import ProductItem from './ProductItem/ProductItem';
import { createQuery} from '@tanstack/solid-query'
import { For } from 'solid-js';

function ProductList() {
  const query = createQuery(() => ['product-list'], () => medusaClient.products.list())

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
              each={query.data?.products}
              children={(product) => <ProductItem product={product} />}
            />
          </Box>
        </Box>
      </Box>
    </>
  );
}

export { ProductList };
