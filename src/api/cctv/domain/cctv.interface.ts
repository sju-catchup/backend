import { IRootEntity } from 'src/api/common/interface/entity.interface';

export type ICCTVId = number;
export type IPosition = { readonly x: string; readonly y: string };
export type IAddress = string;

export type CCTVProps = Pick<ICCTV, 'address'> &
  IPosition &
  Partial<IRootEntity<ICCTVId>>;

export interface ICCTV extends IRootEntity<ICCTVId> {
  position: IPosition;
  address: IAddress;
}
