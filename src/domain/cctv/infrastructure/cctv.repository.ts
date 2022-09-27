import { ICCTVRepository } from './../domain/repository.interface';
import { Inject, Injectable } from '@nestjs/common';
import { CCTV } from '../domain/cctv.aggregate';
import {
  BaseTypeOrmRepository,
  IEntityMapper,
} from 'src/domain/common/repository.base';
import { CCTVEntity } from './model/cctv.entity';
import { ICCTVId } from '../domain/cctv.interface';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CCTVEntityMapper } from './cctv.mapper';

@Injectable()
export class CCTVRepository
  extends BaseTypeOrmRepository<ICCTVId, CCTV, CCTVEntity>
  implements ICCTVRepository
{
  constructor(
    @Inject(CCTVEntityMapper)
    mapper: IEntityMapper<CCTV, CCTVEntity>,
    @InjectRepository(CCTVEntity)
    repository: Repository<CCTVEntity>,
  ) {
    super(mapper, repository);
  }

  nextId(): string {
    return 'adfdfeqfqw';
  }

  async findMany(): Promise<CCTV[]> {
    const list = await this.getRepository().find();
    return list.map(this.getMapper().toAggregate);
  }
}
