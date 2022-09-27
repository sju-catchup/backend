import { AggregateRoot } from 'src/domain/common/model.base';
import { UpdateAggregate } from 'src/domain/common/decorator/update.aggregate';
import {
  CreateCCTV,
  GetCCTV,
  IAddress,
  ICCTVId,
  IPosition,
} from './cctv.interface';

export class CCTV extends AggregateRoot<ICCTVId> {
  private constructor(
    id: ICCTVId,
    private position: IPosition,
    private address: IAddress,
    createdAt: Date,
    updatedAt: Date,
  ) {
    super(id, createdAt, updatedAt);
  }

  static create({ id, x, y, address }: CreateCCTV): CCTV {
    const position: IPosition = { x, y };
    return new CCTV(id, position, address, new Date(), new Date());
  }
  static get({ id, x, y, address, createdAt, updatedAt }: GetCCTV): CCTV {
    return new CCTV(id, { x, y }, address, createdAt, updatedAt);
  }
  getId(): ICCTVId {
    return this.id;
  }

  @UpdateAggregate
  updatePosition(data: IPosition): void {
    this.position = data;
    return;
  }

  getPosition(): IPosition {
    return this.position;
  }

  @UpdateAggregate
  updateAddress(data: IAddress): void {
    this.address = data;
    return;
  }

  getAddress(): IAddress {
    return this.address;
  }
}
