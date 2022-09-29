import { Aggregate } from 'src/api/common/model.base';
import {
  CCTVProps,
  IAddress,
  ICCTV,
  ICCTVId,
  IPosition,
} from './cctv.interface';

export class CCTV extends Aggregate<ICCTVId> implements ICCTV {
  private constructor(
    id: ICCTVId,
    public position: IPosition,
    public address: IAddress,
    createdAt: Date,
    updatedAt: Date,
  ) {
    super(id, createdAt, updatedAt);
  }

  static get({ id, x, y, address, createdAt, updatedAt }: CCTVProps): ICCTV {
    const now = new Date();
    return new CCTV(
      id ?? 0, // 0은 임시 Id
      { x, y },
      address,
      createdAt ?? now,
      updatedAt ?? now,
    );
  }
}
