export interface IEntity<IId> {
  readonly id: IId;
}
export interface IRootEntity<IId> extends IEntity<IId> {
  readonly createdAt: Date;
  readonly updatedAt: Date;
}
