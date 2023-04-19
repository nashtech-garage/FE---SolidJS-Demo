//ProductList.jsx
import { createEffect, createSignal, For, JSXElement, Show } from 'solid-js';
import { A } from '@solidjs/router';
import { Box, Typography, Link, ToggleButton, ToggleButtonGroup } from '@suid/material';
import { medusaClient } from '../utils/medusaClient';
import { IProductType, IProduct } from '../types';
import { ProductItem } from './ProductItem';

function FeaturedProducts() {
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
          paddingLeft: { lg: '4rem', xs: '1.5rem' },
          paddingRight: { lg: '4rem', xs: '1.5rem' },
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
          aria-label='product types'
          sx={{ display: 'flex', justifyContent: 'center', marginBlock: '1rem' }}>
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
        <Box sx={{ margin: '0 2rem' }}>
          <Show
            when={products().length > 0}
            fallback={
              <Typography variant='body2' sx={{ display: 'flex', justifyContent: 'center' }}>
                There are no products
              </Typography>
            }
            children={
              <Box
                sx={{
                  display: 'grid',
                  gridTemplateColumns: '1fr 1fr 1fr 1fr',
                  gap: '2rem',
                }}>
                <For
                  each={products()}
                  children={(product: IProduct) => (<ProductItem product={product} />)}
                />
              </Box>
            }
          />
        </Box>
      </Box>
    </>
  );
}

export { FeaturedProducts };
