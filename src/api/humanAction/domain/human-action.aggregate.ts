import { ICCTVId } from 'src/api/cctv/domain/cctv.interface';
import { Aggregate } from 'src/api/common/model.base';
import {
  HumanActionProps,
  IHAId,
  IHumanAction,
} from './human-action.interface';

export class HumanAction extends Aggregate<IHAId> implements IHumanAction {
  private constructor(
    id: IHAId,
    public type: string,
    readonly start_time: Date,
    readonly end_time: Date,
    readonly uri: string,
    readonly cctv_id: ICCTVId,
    createdAt: Date,
    updatedAt: Date,
  ) {
    super(id, createdAt, updatedAt);
  }

  static get({
    id,
    type,
    start_time,
    end_time,
    uri,
    cctv_id,
    createdAt,
    updatedAt,
  }: HumanActionProps): IHumanAction {
    const now = new Date();
    return new HumanAction(
      id ?? 0, // 0은 임시 Id
      type,
      start_time,
      end_time,
      uri,
      cctv_id,
      createdAt ?? now,
      updatedAt ?? now,
    );
  }
}
