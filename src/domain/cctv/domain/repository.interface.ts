import { IBaseRepository } from 'src/domain/common/repository.base';
import { CCTV } from './cctv.aggregate';
import { ICCTVId } from './cctv.interface';

// eslint-disable-next-line @typescript-eslint/no-empty-interface
export interface ICCTVRepository extends IBaseRepository<ICCTVId, CCTV> {
  findMany: () => Promise<CCTV[]>;
}
