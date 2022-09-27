import { Inject, Injectable } from '@nestjs/common';
import { CCTV } from '../domain/cctv.aggregate';
import { ICCTVRepository } from '../domain/repository.interface';
import { CCTVRepository } from '../infrastructure/cctv.repository';

@Injectable()
export class CCTVService {
  constructor(
    @Inject(CCTVRepository) private readonly repository: ICCTVRepository,
  ) {}

  async create(): Promise<void> {
    const id = this.repository.nextId();
    const cctv = CCTV.create({ id, x: 'sdf', y: 'few', address: 'sdfde' });
    await this.repository.save(cctv);
    return;
  }
  async findOne(): Promise<CCTV> {
    return this.repository.findOne('adfdfeqfqw');
  }
}
