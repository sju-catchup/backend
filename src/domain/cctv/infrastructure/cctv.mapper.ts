import { Injectable } from '@nestjs/common';
import { IEntityMapper } from 'src/domain/common/repository.base';
import { CCTV } from '../domain/cctv.aggregate';
import { CCTVEntity } from './model/cctv.entity';

@Injectable()
export class CCTVEntityMapper implements IEntityMapper<CCTV, CCTVEntity> {
  toAggregate({ id, x, y, address, createdAt, updatedAt }: CCTVEntity): CCTV {
    return CCTV.get({ id, x, y, address, createdAt, updatedAt });
  }
  toRootEntity(aggregate: CCTV): CCTVEntity {
    const position = aggregate.getPosition();
    const data = {
      id: aggregate.getId(),
      address: aggregate.getAddress(),
      createdAt: aggregate.getCreatedAt(),
      updatedAt: aggregate.getUpdatedAt(),
      ...position,
    };
    return CCTVEntity.create(data);
  }
}
