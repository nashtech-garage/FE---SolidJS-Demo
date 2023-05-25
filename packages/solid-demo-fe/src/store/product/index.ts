import { createStore } from 'solid-js/store';
import { ProductFilterAction, ProductFilterState } from './types';
import { enumDisplayTypes } from '../../types/ProductFilter';


const initialState: ProductFilterState = {
  data: {
    options: [],
    numberOfColumns: 4,
    sort: -1,
    displayType: enumDisplayTypes.GRID,
  },
};

const [productFilterStore, setProductFilterStore] = createStore(initialState);

async function dispatchProductFilter(type: ProductFilterAction, payload?: any) {
  switch (type) {
    case ProductFilterAction.SortProduct:
    case ProductFilterAction.FilterProduct: {
      setProductFilterStore('data', payload);
      break;
    }
    case ProductFilterAction.ClearFilter: {
      setProductFilterStore('data', initialState.data);
      break;
    }
    default:
      break;
  }
}

export { productFilterStore, dispatchProductFilter, ProductFilterAction };
