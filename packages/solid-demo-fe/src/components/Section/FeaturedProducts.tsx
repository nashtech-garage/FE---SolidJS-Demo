import { createSignal, For } from 'solid-js';
import { ToggleButton, ToggleButtonGroup, styled } from '@suid/material';
import { createQuery } from '@tanstack/solid-query';

import { medusaClient } from '../../utils';
import { ProductList } from '../Product';
import Section from '../Section';

const FeaturedProducts = () => {
  const [selected, setSelected] = createSignal<string>('all');
  const productsQuery = createQuery(
    () => ['products', selected()],
    () =>
      medusaClient.products.list({
        limit: 8,
        ...(selected() !== 'all' && { type_id: [selected()] }),
      })
  );
  const productTypesQuery = createQuery(
    () => [],
    () => medusaClient.productTypes.list()
  );

  const products = () => {
    return productsQuery.data?.products || [];
  };

  const productTypes = () => {
    const allTypes = {
      id: 'all',
      value: 'all',
    };
    return [allTypes, ...(productTypesQuery.data?.product_types || [])];
  };

  const handleSelectProductType = (e: MouseEvent, newVal: string | null) => {
    if (newVal) {
      setSelected(newVal);
    }
  };

  return (
    <>
      <Section>
        <Section.Title title='Featured Products' subtitle='Special Offer' />
        <ToggleButtonGroupStyled
          value={selected()}
          onChange={handleSelectProductType}
          exclusive
          size='small'
          aria-label='product types'>
          <For
            each={productTypes()}
            children={(productType, index) => (
              <ToggleButtonStyled value={productType.id} aria-label={productType.value} tabIndex={index()}>
                {productType.value}
              </ToggleButtonStyled>
            )}
          />
        </ToggleButtonGroupStyled>
        <ProductList list={products()} />
      </Section>
    </>
  );
};

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

const ToggleButtonStyled = styled(ToggleButton)(({ theme }) => ({
  border: 'none',
  '&[aria-pressed="true"]': {
    color: theme.palette.primary.main,
  },
}));

export { FeaturedProducts };
