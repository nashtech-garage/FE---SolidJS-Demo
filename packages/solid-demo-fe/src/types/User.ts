import { ICommon } from './common';

export interface IUser extends ICommon {
  email: string;
  phone: string | null;
  shipping_addresses: any[];
  first_name: string;
  last_name: string;
  has_account: boolean;
}
