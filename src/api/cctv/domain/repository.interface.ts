import { IBaseRepository } from 'src/api/common/interface/repository.interface';
import { ICCTVId, ICCTV } from './cctv.interface';

export interface ICCTVRepository extends IBaseRepository<ICCTVId, ICCTV> {
  findMany: () => Promise<ICCTV[]>;
}
