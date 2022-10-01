import { IBaseRepository } from 'src/api/common/interface/repository.interface';
import { IHAId, IHumanAction } from './human-action.interface';

export interface IHumanActionRepository
  extends IBaseRepository<IHAId, IHumanAction> {
  findMany: () => Promise<IHumanAction[]>;
}
