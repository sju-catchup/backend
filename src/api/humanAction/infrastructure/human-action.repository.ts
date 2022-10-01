import { Inject, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { FindOneOptions, Repository } from 'typeorm';
import { BaseTypeOrmRepository } from 'src/api/common/repository.base';
import { IEntityMapper } from 'src/api/common/interface/mapper.interface';
import { IHAId, IHumanAction } from '../domain/human-action.interface';
import { HumanActionEntity } from './model/human-action.entity';
import { IHumanActionRepository } from '../domain/repository.interface';
import { HumanActionEntityMapper } from './human-action.mapper';
import { httpExceptionProvider } from 'src/api/common/exception.provider';
import { ExceptionMessage } from 'src/api/common/message.provider';

@Injectable()
export class HumanActionRepository
  extends BaseTypeOrmRepository<IHAId, IHumanAction, HumanActionEntity>
  implements IHumanActionRepository
{
  constructor(
    @Inject(HumanActionEntityMapper)
    mapper: IEntityMapper<IHumanAction, HumanActionEntity>,
    @InjectRepository(HumanActionEntity)
    repository: Repository<HumanActionEntity>,
  ) {
    super(mapper, repository);
  }

  async findOne(id: IHAId): Promise<IHumanAction> {
    const findOption: FindOneOptions<HumanActionEntity> = {
      where: { id, visible: true },
    };
    const entity = await this.getRepository().findOne(findOption);
    if (!entity) {
      throw httpExceptionProvider('404', ExceptionMessage.NotFoundAggregate);
    }
    return this.getMapper().toAggregate(entity);
  }

  async findMany(): Promise<IHumanAction[]> {
    const list = await this.getRepository().find({ where: { visible: true } });
    return list.map(this.getMapper().toAggregate);
  }

  async setVisible(aggregate: IHumanAction): Promise<void> {
    const entity = this.getMapper().toRootEntity(aggregate);
    entity.visible = false;
    await this.getRepository().save(entity);
    return;
  }
}
