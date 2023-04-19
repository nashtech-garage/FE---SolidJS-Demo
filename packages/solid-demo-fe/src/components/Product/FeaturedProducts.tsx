//ProductList.jsx
import { createEffect, createSignal, For } from 'solid-js';
import { Box, Typography, ToggleButton, ToggleButtonGroup } from '@suid/material';

import { medusaClient } from '../../utils';
import { IProductType, IProduct } from '../../types';
import { ProductList } from './ProductList';

const FeaturedProducts = () => {
  const [products, setProducts] = createSignal<IProduct[]>([]);
  const [productTypes, setProductTypes] = createSignal<IProductType[]>([]);
  const [selected, setSelected] = createSignal<string>('all');

  createEffect(() => {
    const query = {
      limit: 8,
      ...(selected() !== 'all' && { type_id: [selected()] }),
    };
    const fetchProducts = async () => {
      const res = await medusaClient.products.list(query);
      setProducts(res.products as IProduct[]);
    };

    fetchProducts();
  });

  createEffect(() => {
    const fetchProductTypes = async () => {
      const res = await medusaClient.productTypes.list();
      setProductTypes(res.product_types as IProductType[]);
    };
    fetchProductTypes();
  });

  const handleSelectProductType = (e: MouseEvent, newVal: string | null) => {
    if (newVal) {
      setSelected(newVal);
    }
  };

  return (
    <>
      <Box
        sx={{
          marginTop: '2rem',
          paddingInline: { lg: '4rem', xs: '0.5rem' },
        }}
        component='section'>
        <Typography
          sx={{
            textAlign: 'center',
            fontSize: '1.5rem',
            marginBottom: '1rem',
          }}>
          Featured Products
        </Typography>
        <ToggleButtonGroup
          value={selected()}
          onChange={handleSelectProductType}
          exclusive
          size='small'
          aria-label='product types'
          sx={{ justifyContent: 'center', marginBlock: '1rem', display: { xs: 'none', md: 'flex' } }}>
          <ToggleButton value='all'>All</ToggleButton>
          <For
            each={productTypes()}
            children={(productType: IProductType) => (
              <ToggleButton value={productType.id} aria-label='productType.value'>
                {productType.value}
              </ToggleButton>
            )}
          />
        </ToggleButtonGroup>
        <Box sx={{ margin: { xs: '0', md: '0 2rem' } }}>
          <ProductList list={products} />
        </Box>
      </Box>
    </>
  );
};

export { FeaturedProducts };
