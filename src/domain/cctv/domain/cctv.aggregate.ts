import { AggregateRoot } from 'src/domain/common/model.base';
import { UpdateAggregate } from 'src/domain/common/decorator/update.aggregate';
import { CreateCCTV, IAddress, ICCTVId, IPosition } from './cctv.interface';

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
