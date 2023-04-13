import { ICommon } from './common';

export interface ICollection extends ICommon {
  handle: string;
  metadata: Record<string, string>;
  title: string;
}
