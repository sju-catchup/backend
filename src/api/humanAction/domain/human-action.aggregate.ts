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
    createdAt: Date,
    updatedAt: Date,
    public type: string,
    readonly start_time: Date,
    readonly end_time: Date,
    readonly url: string,
    readonly cctv_id: ICCTVId,
  ) {
    super(id, createdAt, updatedAt);
  }

  static get({
    id,
    type,
    start_time,
    end_time,
    url,
    cctv_id,
    createdAt,
    updatedAt,
  }: HumanActionProps): IHumanAction {
    const now = new Date();
    const agg = new HumanAction(
      id ?? 0, // 0은 임시 Id
      createdAt ?? now,
      updatedAt ?? now,
      type,
      start_time,
      end_time,
      url,
      cctv_id,
    );
    return agg;
  }
}
