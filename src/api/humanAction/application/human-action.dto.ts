import { IRootEntity } from 'src/api/common/interface/entity.interface';
import { IHAId, IHumanAction } from '../domain/human-action.interface';

export type CreateHumanActionDTO = Omit<IHumanAction, keyof IRootEntity<IHAId>>;

export type FindOneHumanActionDTO = Pick<IHumanAction, 'id'>;

export type UpdateHumanActionDTO = Partial<Pick<IHumanAction, 'type'>>;

export type RemoveHumanActionDTO = Pick<IHumanAction, 'id'>;
