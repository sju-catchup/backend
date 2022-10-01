import { ICCTVId } from 'src/api/cctv/domain/cctv.interface';
import { IRootEntity } from 'src/api/common/interface/entity.interface';

export type IHAId = number;

export interface IHumanAction extends IRootEntity<IHAId> {
  type: string;
  start_time: Date;
  end_time: Date;
  uri: string;
  cctv_id: ICCTVId;
}

export type HumanActionProps = Omit<IHumanAction, keyof IRootEntity<IHAId>> &
  Partial<IRootEntity<IHAId>>;
