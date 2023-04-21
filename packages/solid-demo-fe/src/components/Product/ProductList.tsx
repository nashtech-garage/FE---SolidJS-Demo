//ProductList.jsx
import { For, Show } from 'solid-js';
import { Box, Typography } from '@suid/material';
import { Product } from '@medusajs/medusa'

import { ProductItem } from './ProductItem';

interface ProductListProps {
  list: Product[];
  containerClass?: string;
}

function ProductList(props: ProductListProps) {
  return (
    <Box sx={{ margin: { xs: '0', md: '0 2rem' } }} class={props.containerClass}>
      <Show
        when={props.list.length > 0}
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
            <For each={props.list} children={(data, index) => <ProductItem product={data} index={index} />} />
          </Box>
        }
      />
    </Box>
  );
}

export { ProductList };
