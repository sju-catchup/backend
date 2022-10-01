import { Inject, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { BaseTypeOrmRepository } from 'src/api/common/repository.base';
import { IEntityMapper } from 'src/api/common/interface/mapper.interface';
import { IHAId, IHumanAction } from '../domain/human-action.interface';
import { HumanActionEntity } from './model/human-action.entity';
import { IHumanActionRepository } from '../domain/repository.interface';
import { HumanActionEntityMapper } from './human-action.mapper';

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
}
