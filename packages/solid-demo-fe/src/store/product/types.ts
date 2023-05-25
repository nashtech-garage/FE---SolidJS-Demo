import { IProductFilter } from "../../types/ProductFilter";

export enum ProductFilterAction {
  SortProduct,
  FilterProduct,
  ClearFilter,
}

export interface ProductFilterState {
  data?: IProductFilter;
}