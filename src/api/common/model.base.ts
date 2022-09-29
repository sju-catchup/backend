import { IRootEntity, IEntity } from './interface/entity.interface';

export abstract class Entity<IId> implements IEntity<IId> {
  constructor(readonly id: IId) {}
}

export abstract class Aggregate<IId>
  extends Entity<IId>
  implements IRootEntity<IId>
{
  constructor(
    readonly id: IId,
    readonly createdAt: Date,
    readonly updatedAt: Date,
  ) {
    super(id);
  }
}
