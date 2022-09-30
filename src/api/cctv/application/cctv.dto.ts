import { ICCTV } from '../domain/cctv.interface';

export type CreateCCTVDTO = Pick<ICCTV, 'address' | 'position'>;

export type FindOneCCTVDTO = Pick<ICCTV, 'id'>;

export type UpdateCCTVDTO = Partial<Pick<ICCTV, 'address' | 'position'>>;

export type RemoveCCTVDTO = Pick<ICCTV, 'id'>;
