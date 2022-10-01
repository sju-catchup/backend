import { Injectable } from '@nestjs/common';
import { IEntityMapper } from 'src/api/common/interface/mapper.interface';
import { HumanAction } from '../domain/human-action.aggregate';
import { IHumanAction } from '../domain/human-action.interface';
import { HumanActionEntity } from './model/human-action.entity';

export const map_HumanActionEntity_to_IHumanAction = ({
  id,
  type,
  start_time,
  end_time,
  cctv_id,
  uri,
  createdAt,
  updatedAt,
}: HumanActionEntity): IHumanAction => {
  return HumanAction.get({
    id,
    type,
    start_time,
    end_time,
    cctv_id,
    uri,
    createdAt,
    updatedAt,
  });
};

export const map_IHumanAction_to_HumanActionEntity = ({
  id,
  type,
  start_time,
  end_time,
  cctv_id,
  uri,
  createdAt,
  updatedAt,
}: IHumanAction): HumanActionEntity => {
  const entity = new HumanActionEntity();
  entity.id = id;
  entity.type = type;
  entity.start_time = start_time;
  entity.end_time = end_time;
  entity.cctv_id = cctv_id;
  entity.uri = uri;
  entity.createdAt = createdAt;
  entity.updatedAt = updatedAt;
  entity.visible = true;
  return entity;
};

@Injectable()
export class HumanActionEntityMapper
  implements IEntityMapper<IHumanAction, HumanActionEntity>
{
  toAggregate = map_HumanActionEntity_to_IHumanAction;
  toRootEntity = map_IHumanAction_to_HumanActionEntity;
}
