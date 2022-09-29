import { Inject, Injectable } from '@nestjs/common';
import { CCTV } from '../domain/cctv.aggregate';
import { ICCTV } from '../domain/cctv.interface';
import { ICCTVRepository } from '../domain/repository.interface';
import { CCTVRepository } from '../infrastructure/cctv.repository';

@Injectable()
export class CCTVService {
  constructor(
    @Inject(CCTVRepository) private readonly repository: ICCTVRepository,
  ) {}

  async create(): Promise<ICCTV> {
    const agg = CCTV.get({
      x: 'sdf',
      y: 'few',
      address: 'sdfde',
    });
    const cctv = await this.repository.save(agg);
    console.log(cctv);
    return cctv;
  }
  async findOne(): Promise<ICCTV> {
    const cctv = await this.repository.findOne(5);
    cctv.address = 'check2';

    return this.repository.save(cctv);
  }
}
