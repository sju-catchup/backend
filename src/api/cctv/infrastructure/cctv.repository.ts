import { ICCTVRepository } from '../domain/repository.interface';
import { Inject, Injectable } from '@nestjs/common';
import { CCTVEntity } from './model/cctv.entity';
import { ICCTV, ICCTVId } from '../domain/cctv.interface';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CCTVEntityMapper } from './cctv.mapper';
import { BaseTypeOrmRepository } from 'src/api/common/repository.base';
import { IEntityMapper } from 'src/api/common/interface/mapper.interface';

@Injectable()
export class CCTVRepository
  extends BaseTypeOrmRepository<ICCTVId, ICCTV, CCTVEntity>
  implements ICCTVRepository
{
  constructor(
    @Inject(CCTVEntityMapper)
    mapper: IEntityMapper<ICCTV, CCTVEntity>,
    @InjectRepository(CCTVEntity)
    repository: Repository<CCTVEntity>,
  ) {
    super(mapper, repository);
  }

  nextId(): number {
    return 0;
  }

  async findMany(): Promise<ICCTV[]> {
    const list = await this.getRepository().find();
    return list.map(this.getMapper().toAggregate);
  }
}
