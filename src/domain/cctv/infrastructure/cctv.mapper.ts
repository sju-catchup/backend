import { Injectable } from '@nestjs/common';
import { IEntityMapper } from 'src/domain/common/repository.base';
import { CCTV } from '../domain/cctv.aggregate';
import { CCTVEntity } from './model/cctv.entity';

@Injectable()
export class CCTVEntityMapper implements IEntityMapper<CCTV, CCTVEntity> {
  toAggregate: (entity: CCTVEntity) => CCTV;
  toRootEntity: (aggregate: CCTV) => CCTVEntity;
}
