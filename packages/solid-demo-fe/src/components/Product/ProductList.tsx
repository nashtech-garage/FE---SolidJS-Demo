//ProductList.jsx
import { Accessor, For, Show } from 'solid-js';
import { Box, Typography } from '@suid/material';

import { ProductItem } from './ProductItem';
import { IProduct } from '../../types';

interface ProductListProps {
  list: Accessor<IProduct[]>;
  containerClass?: string;
}

function ProductList({ list, containerClass }: ProductListProps) {
  return (
    <Box sx={{ margin: { xs: '0', md: '0 2rem' } }} class={containerClass}>
      <Show
        when={list().length > 0}
        fallback={
          <Typography variant='body2' sx={{ display: 'flex', justifyContent: 'center' }}>
            There are no products
          </Typography>
        }
        children={
          <Box
            sx={{
              display: 'grid',
              gap: '2rem',
              gridTemplateColumns: {
                xs: '1fr',
                md: '1fr 1fr 1fr 1fr',
              },
            }}>
            <For each={list()} children={(data, index) => <ProductItem product={data} index={index} />} />
          </Box>
        }
      />
    </Box>
  );
}

export { ProductList };
