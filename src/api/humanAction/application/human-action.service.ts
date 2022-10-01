import { HumanAction } from './../domain/human-action.aggregate';
import { Inject, Injectable } from '@nestjs/common';
import { IHumanAction } from '../domain/human-action.interface';
import { IHumanActionRepository } from '../domain/repository.interface';
import { HumanActionRepository } from '../infrastructure/human-action.repository';
import {
  CreateHumanActionDTO,
  FindOneHumanActionDTO,
  RemoveHumanActionDTO,
  UpdateHumanActionDTO,
} from './human-action.dto';

@Injectable()
export class HumanActionService {
  constructor(
    @Inject(HumanActionRepository)
    private readonly repository: IHumanActionRepository,
  ) {}

  async create({
    type,
    start_time,
    end_time,
    uri,
    cctv_id,
  }: CreateHumanActionDTO): Promise<IHumanAction> {
    const agg = HumanAction.get({ type, start_time, end_time, uri, cctv_id });
    return this.repository.save(agg);
  }

  async findOne({ id }: FindOneHumanActionDTO): Promise<IHumanAction> {
    return this.repository.findOne(id);
  }

  async findMany(): Promise<IHumanAction[]> {
    return this.repository.findMany();
  }

  /** Transaction 필요함 */
  async update(
    { id }: FindOneHumanActionDTO,
    { type }: UpdateHumanActionDTO,
  ): Promise<IHumanAction> {
    const agg = await this.repository.findOne(id);
    if (type) {
      agg.type = type;
    }
    return this.repository.save(agg);
  }

  /** Transaction 필요함 */
  async remove({ id }: RemoveHumanActionDTO): Promise<void> {
    const agg = await this.repository.findOne(id);
    return this.repository.setVisible(agg);
  }
}
