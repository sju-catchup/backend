import { IBaseRepository } from 'src/api/common/interface/repository.interface';
import { ICCTVId, ICCTV } from './cctv.interface';

export type ICCTVRepository = IBaseRepository<ICCTVId, ICCTV>;
