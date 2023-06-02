//ProductList.jsx
import { For, Show } from 'solid-js';
import { Box, Typography } from '@suid/material';
import { Product } from '@medusajs/medusa';

import { ProductItem } from './ProductItem';
import { productFilterStore } from '../../store';
import { enumDisplayTypes } from '../../types/ProductFilter';

interface ProductListProps {
  list: Product[];
  containerClass?: string;
}

const gridTemplateColumns = {
  2: '1fr 1fr',
  3: '1fr 1fr 1fr',
  4: '1fr 1fr 1fr 1fr',
  6: '1fr 1fr 1fr 1fr 1fr 1fr',
};

function ProductList(props: ProductListProps) {
  const productFilter = () => productFilterStore.data;

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
              gridTemplateColumns:
                productFilter()?.displayType === enumDisplayTypes.GRID
                  ? {
                      xs: '1fr',
                      md: gridTemplateColumns[productFilter()?.numberOfColumns ?? 4],
                      lg: gridTemplateColumns[productFilter()?.numberOfColumns ?? 4],
                    }
                  : { xs: '1fr' },
            }}>
            <For each={props.list} children={(data, index) => <ProductItem product={data} index={index} />} />
          </Box>
        }
      />
    </Box>
  );
}

export { ProductList };
