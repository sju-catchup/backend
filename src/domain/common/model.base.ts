export interface IEntity<IId> {
  readonly id: IId;
}

export abstract class Entity<IId> implements IEntity<IId> {
  constructor(readonly id: IId) {}
}

export abstract class AggregateRoot<IId> extends Entity<IId> {
  constructor(
    readonly id: IId,
    private createdAt: Date,
    private updatedAt: Date,
  ) {
    super(id);
  }

  getCreatedAt(): Date {
    return this.createdAt;
  }
  getUpdatedAt(): Date {
    return this.updatedAt;
  }
  updateUpdatedAt(): void {
    this.updatedAt = new Date();
    return;
  }
}
