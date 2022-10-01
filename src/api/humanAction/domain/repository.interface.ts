import { IBaseRepository } from 'src/api/common/interface/repository.interface';
import { FindOptionsRelations } from 'typeorm';
import { HumanActionEntity } from '../infrastructure/model/human-action.entity';
import { IHAId, IHumanAction } from './human-action.interface';

export interface IHumanActionRepository
  extends IBaseRepository<IHAId, IHumanAction> {
  findOne: (
    id: IHAId,
    relation?: FindOptionsRelations<HumanActionEntity>,
  ) => Promise<IHumanAction>;

  findMany: (
    relation?: FindOptionsRelations<HumanActionEntity>,
  ) => Promise<IHumanAction[]>;

  setVisible: (aggregate: IHumanAction) => Promise<void>;
}
