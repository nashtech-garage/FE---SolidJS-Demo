export interface ICommon {
  id: string;
  created_at: Date;
}

export enum Phase {
  Loading,
  Success,
  Error,
}
