import { Inject, Injectable } from '@nestjs/common';
import { CCTV } from '../domain/cctv.aggregate';
import { ICCTV } from '../domain/cctv.interface';
import { ICCTVRepository } from '../domain/repository.interface';
import { CCTVRepository } from '../infrastructure/cctv.repository';
import {
  CreateCCTVDTO,
  FindOneCCTVDTO,
  RemoveCCTVDTO,
  UpdateCCTVDTO,
} from './cctv.dto';

@Injectable()
export class CCTVService {
  constructor(
    @Inject(CCTVRepository) private readonly repository: ICCTVRepository,
  ) {}

  async create({ position: { x, y }, address }: CreateCCTVDTO): Promise<ICCTV> {
    const agg = CCTV.get({ x, y, address });
    return this.repository.save(agg);
  }

  async findOne({ id }: FindOneCCTVDTO): Promise<ICCTV> {
    return this.repository.findOne(id);
  }

  async findMany(): Promise<ICCTV[]> {
    return this.repository.findMany();
  }

  /** Transaction 필요함 */
  async update(
    { id }: FindOneCCTVDTO,
    { position, address }: UpdateCCTVDTO,
  ): Promise<ICCTV> {
    const agg = await this.repository.findOne(id);
    if (address) {
      agg.address = address;
    }
    if (position) {
      agg.position = position;
    }
    return this.repository.save(agg);
  }

  /** Transaction 필요함 */
  async remove({ id }: RemoveCCTVDTO): Promise<void> {
    const agg = await this.repository.findOne(id);
    return this.repository.remove(agg);
  }
}
