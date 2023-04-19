import { ICommon } from './common';

export interface ICollection extends Omit<ICommon, 'createdAt'> {
  handle: string;
  metadata: Record<string, string>;
  title: string;
}
