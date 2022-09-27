import { AggregateRoot } from './aggregate.class';

export interface IBaseRepository<IAggregate extends AggregateRoot<IId>, IId> {
  nextId: () => IId;
  findOne: (id: IId) => Promise<IAggregate>;
  save: (aggregate: IAggregate) => Promise<void>;
  remove: (aggregate: IAggregate) => Promise<void>;
}
