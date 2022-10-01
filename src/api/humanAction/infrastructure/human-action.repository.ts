import { Inject, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { FindOneOptions, FindOptionsRelations, Repository } from 'typeorm';
import { BaseTypeOrmRepository } from 'src/api/common/repository.base';
import { IEntityMapper } from 'src/api/common/interface/mapper.interface';
import { IHAId, IHumanAction } from '../domain/human-action.interface';
import { HumanActionEntity } from './model/human-action.entity';
import { IHumanActionRepository } from '../domain/repository.interface';
import { HumanActionEntityMapper } from './human-action.mapper';
import { httpExceptionProvider } from 'src/api/common/exception.provider';
import { ExceptionMessage } from 'src/api/common/message.provider';
import { map_CCTVEntity_to_ICCTV } from 'src/api/cctv/infrastructure/cctv.mapper';

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

  async findOne(
    id: IHAId,
    relations?: FindOptionsRelations<HumanActionEntity>,
  ): Promise<IHumanAction> {
    const findOption: FindOneOptions<HumanActionEntity> = {
      where: { id, visible: true },
      ...(relations ? { relations } : {}),
    };
    const entity = await this.getRepository().findOne(findOption);
    if (!entity) {
      throw httpExceptionProvider('404', ExceptionMessage.NotFoundAggregate);
    }
    const agg = this.getMapper().toAggregate(entity);
    if (entity.cctv) {
      agg.cctv = map_CCTVEntity_to_ICCTV(entity.cctv);
    }
    return agg;
  }

  async findMany(
    relations?: FindOptionsRelations<HumanActionEntity>,
  ): Promise<IHumanAction[]> {
    const list = await this.getRepository().find({
      where: { visible: true },
      ...(relations ? { relations } : {}),
    });
    return list.map((entity) => {
      const agg = this.getMapper().toAggregate(entity);
      if (entity.cctv) {
        agg.cctv = map_CCTVEntity_to_ICCTV(entity.cctv);
      }
      return agg;
    });
  }

  async setVisible(aggregate: IHumanAction): Promise<void> {
    const entity = this.getMapper().toRootEntity(aggregate);
    entity.visible = false;
    await this.getRepository().save(entity);
    return;
  }
}
