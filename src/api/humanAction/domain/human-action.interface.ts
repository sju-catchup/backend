import { ICCTV, ICCTVId } from 'src/api/cctv/domain/cctv.interface';
import { IRootEntity } from 'src/api/common/interface/entity.interface';
import { Aggregate } from 'src/api/common/model.base';

export type IHAId = number;

export interface IHumanAction extends Aggregate<IHAId> {
  type: string;
  start_time: Date;
  end_time: Date;
  uri: string;
  cctv_id: ICCTVId;
  cctv?: ICCTV;
}

export type HumanActionProps = Omit<IHumanAction, keyof IRootEntity<IHAId>> &
  Partial<IRootEntity<IHAId>>;
