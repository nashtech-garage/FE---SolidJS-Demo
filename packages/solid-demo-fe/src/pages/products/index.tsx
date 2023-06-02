import { Container, Grid } from '@suid/material';
import { createQuery } from '@tanstack/solid-query';

import { medusaClient } from '../../utils';
import { ProductList } from '../../components';
import { useLocation, useNavigate, useSearchParams } from '@solidjs/router';
import { ProductFilterAction, dispatchProductFilter, productFilterStore } from '../../store';
import { createEffect, createResource, onCleanup, Show } from 'solid-js';
import { getFilterOptions } from '../../utils/productHelper';

import FilterWrapper from '../../components/Filter/FilterWrapper';
import Banner from '../../components/Section/Banner';
import FilterBar from '../../components/Filter/FilterBar';

function Products() {
  const { pathname } = useLocation();
  const [searchParams] = useSearchParams();
  const collectionId = searchParams.collectionId;
  const productsQuery = createQuery(
    () => ['products'],
    () =>
      medusaClient.products.list({
        collection_id: [collectionId],
      })
  );

  const productFilter = () => productFilterStore;
  const navigate = useNavigate();

  createEffect(() => {
    const data = productFilter().data;
    if (data) {
      const queryStr = [
        collectionId ? `collectionId=${collectionId}` : '',
        data.options
          .filter(({ values }) => values.length)
          .map(({ type, values }) => `${type}=${values.join(',')}`)
          .join('&'),
        data.sort ? `sort=${data.sort}` : '',
        data.numberOfColumns ? `numberOfColumns=${data.numberOfColumns}` : '',
      ]
        .filter((str) => !!str)
        .join('&');

      navigate(`${pathname}?${queryStr}`, {
        replace: true,
      });
    }
  });

  const products = () => {
    return productsQuery.data?.products || [];
  };

  const paginationInfo = () => {
    return {
      count: productsQuery.data?.count ?? 0,
      offset: productsQuery.data?.offset ?? 0,
      limit: productsQuery.data?.limit ?? 0,
    };
  };

  const [filterOptions] = createResource(getFilterOptions);

  onCleanup(() => {
    dispatchProductFilter(ProductFilterAction.ClearFilter);
  });

  return (
    <Container>
      <Grid container spacing={{ xs: '1.5rem' }}>
        <Grid item xs={12} sm={3} xl={3}>
          <Show when={!filterOptions.loading && filterOptions().data.length}>
            <FilterWrapper data={filterOptions().data} />
          </Show>
        </Grid>
        <Grid item xs={12} sm={9} xl={9}>
          <Show when={collectionId}>
            <Banner />
          </Show>
          <FilterBar {...paginationInfo()} />
          <ProductList list={products()} />
        </Grid>
      </Grid>
    </Container>
  );
}

export default Products;
