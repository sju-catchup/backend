export type ICCTVId = string;
export type IPosition = { readonly x: string; readonly y: string };
export type IAddress = string;

export type CreateCCTV = {
  id: ICCTVId;
  address: IAddress;
} & IPosition;

export type GetCCTV = {
  createdAt: Date;
  updatedAt: Date;
} & CreateCCTV;
