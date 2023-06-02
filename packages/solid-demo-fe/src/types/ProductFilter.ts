export enum enumDisplayTypes {
  'GRID' = 'GRID',
  'LIST' = 'LIST',
}
export type IDisplayTypes = enumDisplayTypes;

export interface IProductFilter {
  options: {
    type: string;
    values: string[];
  }[];
  sort: number;
  displayType: IDisplayTypes;
  numberOfColumns?: number;
}
