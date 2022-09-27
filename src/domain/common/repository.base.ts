import { FindOneOptions, Repository } from 'typeorm';
import { AggregateRoot } from './model.base';
import { TypeOrmRootEntity } from './entitiy.base';

export interface IBaseRepository<IId, IAggregate extends AggregateRoot<IId>> {
  nextId: () => IId;
  findOne: (id: IId) => Promise<IAggregate>;
  save: (aggregate: IAggregate) => Promise<void>;
  remove: (aggregate: IAggregate) => Promise<void>;
}

export interface IEntityMapper<IAggregate, IRootEntity> {
  toAggregate: (entity: IRootEntity) => IAggregate;
  toRootEntity: (aggregate: IAggregate) => IRootEntity;
}

export abstract class BaseTypeOrmRepository<
  IId,
  IAggregate extends AggregateRoot<IId>,
  IRootEntity extends TypeOrmRootEntity,
> implements IBaseRepository<IId, IAggregate>
{
  constructor(
    private readonly mapper: IEntityMapper<IAggregate, IRootEntity>,
    private readonly repository: Repository<IRootEntity>,
  ) {}

  abstract nextId(): IId;

  async findOne(id: IId): Promise<IAggregate> {
    const findOption: FindOneOptions = { where: { id } };
    const entity = await this.repository.findOne(findOption);
    if (!entity) {
      throw new Error();
    }
    return this.mapper.toAggregate(entity);
  }

  async save(aggregate: IAggregate): Promise<void> {
    const entity = this.mapper.toRootEntity(aggregate);
    await this.repository.save(entity);
    return;
  }
  async remove(aggregate: IAggregate): Promise<void> {
    const entity = this.mapper.toRootEntity(aggregate);
    await this.repository.remove(entity);
    return;
  }

  getMapper(): IEntityMapper<IAggregate, IRootEntity> {
    return this.mapper;
  }
  getRepository(): Repository<IRootEntity> {
    return this.repository;
  }
}
