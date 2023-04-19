//ProductList.jsx
import { createEffect, createSignal, For } from 'solid-js';
import { Box, Typography, ToggleButton, ToggleButtonGroup, styled } from '@suid/material';

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
      <SectionStyled component='section'>
        <TitleStyled>Featured Products</TitleStyled>
        <ToggleButtonGroupStyled
          value={selected()}
          onChange={handleSelectProductType}
          exclusive
          size='small'
          aria-label='product types'>
          <ToggleButton value='all'>All</ToggleButton>
          <For
            each={productTypes()}
            children={(productType: IProductType) => (
              <ToggleButton value={productType.id} aria-label='productType.value'>
                {productType.value}
              </ToggleButton>
            )}
          />
        </ToggleButtonGroupStyled>
        <ProductList list={products} />
      </SectionStyled>
    </>
  );
};

const SectionStyled = styled(Box)(({ theme }) => ({
  marginBlock: 64,
  [theme.breakpoints.up('xs')]: {
    paddingInline: '0.5rem',
  },
  [theme.breakpoints.up('lg')]: {
    paddingInline: '4rem',
  },
}));

const TitleStyled = styled(Typography)({
  textAlign: 'center',
  fontSize: '1.5rem',
  marginBottom: '1rem',
});

const ToggleButtonGroupStyled = styled(ToggleButtonGroup)(({ theme }) => ({
  justifyContent: 'center',
  marginBlock: '1rem',
  [theme.breakpoints.up('xs')]: {
    display: 'none',
  },
  [theme.breakpoints.up('lg')]: {
    display: 'flex',
  },
}));

export { FeaturedProducts };
