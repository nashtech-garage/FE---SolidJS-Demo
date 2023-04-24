import { createSignal, For } from 'solid-js';
import { Typography, ToggleButton, ToggleButtonGroup, styled } from '@suid/material';
import { createQuery } from '@tanstack/solid-query';

import { medusaClient } from '../../utils';
import { ProductList } from './ProductList';
import { Section } from '../Section';

const FeaturedProducts = () => {
  const [selected, setSelected] = createSignal<string>('all');
  const productsQuery = createQuery(() => ['products', selected()], () => medusaClient.products.list({
    limit: 8,
    ...(selected() !== 'all' && { type_id: [selected()] }),
  }))
  const productTypesQuery = createQuery(() => [], () => medusaClient.productTypes.list())

  const products = () => {
    return productsQuery.data?.products || []
  }

  const productTypes = () => {
    return productTypesQuery.data?.product_types || []
  }

  const handleSelectProductType = (e: MouseEvent, newVal: string | null) => {
    if (newVal) {
      setSelected(newVal);
    }
  };

  return (
    <>
      <Section>
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
            children={(productType) => (
              <ToggleButton value={productType.id} aria-label='productType.value'>
                {productType.value}
              </ToggleButton>
            )}
          />
        </ToggleButtonGroupStyled>
        <ProductList list={products()} />
      </Section>
    </>
  );
};

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
