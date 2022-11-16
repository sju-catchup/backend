import { Inject, Injectable } from '@nestjs/common';
import { CCTV } from '../domain/cctv.aggregate';
import { ICCTV } from '../domain/cctv.interface';
import { ICCTVRepository } from '../domain/repository.interface';
import { CCTVRepository } from '../infrastructure/cctv.repository';
import { CreateCCTVList } from '../presentation/cctv.command';
import { FindOneCCTVDTO, RemoveCCTVDTO, UpdateCCTVDTO } from './cctv.dto';

@Injectable()
export class CCTVService {
  constructor(
    @Inject(CCTVRepository) private readonly repository: ICCTVRepository,
  ) {}

  async create({ cctvs }: CreateCCTVList): Promise<ICCTV[]> {
    const result: ICCTV[] = [];
    for (const {
      address,
      position: { x, y },
    } of cctvs) {
      const agg = CCTV.get({ x, y, address });
      result.push(await this.repository.save(agg));
    }
    return result;
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
