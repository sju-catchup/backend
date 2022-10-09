import { IRootEntity } from 'src/api/common/interface/entity.interface';
import { Aggregate } from 'src/api/common/model.base';

export type ICCTVId = number;
export type IPosition = { readonly x: string; readonly y: string };
export type IAddress = string;

export type CCTVProps = Pick<ICCTV, 'address'> &
  IPosition &
  Partial<IRootEntity<ICCTVId>>;

export interface ICCTV extends Aggregate<ICCTVId> {
  position: IPosition;
  address: IAddress;
}
