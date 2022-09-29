import { Injectable } from '@nestjs/common';
import { IEntityMapper } from 'src/api/common/interface/mapper.interface';
import { CCTV } from '../domain/cctv.aggregate';
import { ICCTV } from '../domain/cctv.interface';
import { CCTVEntity } from './model/cctv.entity';

@Injectable()
export class CCTVEntityMapper implements IEntityMapper<ICCTV, CCTVEntity> {
  toAggregate({ id, x, y, address, createdAt, updatedAt }: CCTVEntity): ICCTV {
    return CCTV.get({ id, x, y, address, createdAt, updatedAt });
  }

  toRootEntity({
    id,
    address,
    position: { x, y },
    createdAt,
    updatedAt,
  }: ICCTV): CCTVEntity {
    const entity = new CCTVEntity();
    entity.id = id;
    entity.address = address;
    entity.x = x;
    entity.y = y;
    entity.createdAt = createdAt;
    entity.updatedAt = updatedAt;
    return entity;
  }
}
