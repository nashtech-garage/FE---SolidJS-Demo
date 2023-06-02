import { Container, Grid } from '@suid/material';
import { ProductList } from '../../components';
import { useLocation, useNavigate, useParams } from '@solidjs/router';
import { ProductFilterAction, dispatchProductFilter, productFilterStore } from '../../store';
import { createEffect, createResource, createSignal, onCleanup, Show } from 'solid-js';
import { filterProduct, getFilterOptions } from '../../utils/productHelper';

import FilterWrapper from '../../components/Filter/FilterWrapper';
import Banner from '../../components/Section/Banner';
import FilterBar from '../../components/Filter/FilterBar';
import { IProductFilter } from '../../types/ProductFilter';
import Pagination from '../../components/Pagination';

interface IPageInfo {
  limit: number;
  offset: number;
}

const PAGE_SIZE = 12;

const createQueryStr = (collectionId: string, data: IProductFilter | undefined, pageInfo: IPageInfo) => {
  return [
    collectionId ? `collectionId=${collectionId}` : '',
    data?.options
      .filter(({ values }) => values.length)
      .map(({ type, values }) => `${type}=${values.join(',')}`)
      .join('&'),
    data?.sort ? `sort=${data.sort}` : '',
    data?.numberOfColumns ? `numberOfColumns=${data.numberOfColumns}` : '',
    `limit=${pageInfo.limit}`,
    `offset=${pageInfo.offset}`,
  ]
    .filter((str) => !!str)
    .join('&');
};
function Products() {
  const { collectionId } = useParams();
  const [activePage, setActivePage] = createSignal(0);

  const productFilterData = () => productFilterStore;
  const [productFilter] = createResource(
    () =>
      createQueryStr(collectionId, productFilterData().data, {
        limit: PAGE_SIZE,
        offset: activePage(),
      }),
    filterProduct
  );

  const products = () => {
    return productFilter()?.data || [];
  };

  const paginationInfo = () => {
    return {
      count: productFilter()?.count ?? 0,
      offset: productFilter()?.offset ?? 0,
      limit: productFilter()?.limit ?? PAGE_SIZE,
    };
  };

  createEffect(() => {
    setActivePage(paginationInfo().offset);
  });

  const [filterOptions] = createResource(getFilterOptions, {});

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
          <Pagination
            count={productFilter()?.count}
            onChange={setActivePage}
            itemsPerPage={productFilter()?.limit}
            activePage={activePage()}
          />
        </Grid>
      </Grid>
    </Container>
  );
}

export default Products;
