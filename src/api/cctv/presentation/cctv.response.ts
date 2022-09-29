import { ICCTV, ICCTVId } from '../domain/cctv.interface';

export type CCTVResponse = {
  cctv: ICCTV;
};

export type CCTVArrayResponse = {
  cctv: ICCTV[];
};

export type CCTVDeleteResponse = {
  cctv_id: ICCTVId;
};
