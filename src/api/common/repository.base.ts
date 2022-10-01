import { FindOneOptions, Repository } from 'typeorm';
import { TypeOrmRootEntity } from './entitiy.base';
import { IBaseRepository } from './interface/repository.interface';
import { IEntityMapper } from './interface/mapper.interface';
import { IRootEntity } from './interface/entity.interface';
import { httpExceptionProvider } from './exception.provider';
import { ExceptionMessage } from './message.provider';

export abstract class BaseTypeOrmRepository<
  IId,
  IAggregate extends IRootEntity<IId>,
  IEntity extends TypeOrmRootEntity,
> implements IBaseRepository<IId, IAggregate>
{
  constructor(
    private readonly mapper: IEntityMapper<IAggregate, IEntity>,
    private readonly repository: Repository<IEntity>,
  ) {}

  async findOne(id: IId): Promise<IAggregate> {
    const findOption: FindOneOptions = { where: { id } };
    const entity = await this.repository.findOne(findOption);
    if (!entity) {
      throw httpExceptionProvider('404', ExceptionMessage.NotFoundAggregate);
    }
    return this.mapper.toAggregate(entity);
  }

  async findMany(): Promise<IAggregate[]> {
    const list = await this.getRepository().find();
    return list.map(this.getMapper().toAggregate);
  }

  async save(aggregate: IAggregate): Promise<IAggregate> {
    const entity = this.mapper.toRootEntity(aggregate);
    delete entity.createdAt;
    delete entity.updatedAt;
    const newEntity = await this.repository.save(entity);
    return this.mapper.toAggregate(newEntity);
  }

  async remove(aggregate: IAggregate): Promise<void> {
    const entity = this.mapper.toRootEntity(aggregate);
    await this.repository.remove(entity);
    return;
  }

  protected getMapper(): IEntityMapper<IAggregate, IEntity> {
    return this.mapper;
  }
  protected getRepository(): Repository<IEntity> {
    return this.repository;
  }
}
