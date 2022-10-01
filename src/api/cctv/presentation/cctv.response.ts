import { ICCTV, ICCTVId } from '../domain/cctv.interface';

export type CCTVResponse = {
  CCTV: ICCTV;
};

export type CCTVArrayResponse = {
  CCTV: ICCTV[];
};

export type CCTVDeleteResponse = {
  cctv_id: ICCTVId;
};
