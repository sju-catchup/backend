import { IRootEntity } from './entity.interface';

export interface IBaseRepository<IId, IAggregate extends IRootEntity<IId>> {
  findOne: (id: IId) => Promise<IAggregate>;
  save: (aggregate: IAggregate) => Promise<IAggregate>;
  remove: (aggregate: IAggregate) => Promise<void>;
}
