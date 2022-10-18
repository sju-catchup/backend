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
import { HumanActionGateway } from '../presentation/human-action.gateway';

@Injectable()
export class HumanActionService {
  constructor(
    @Inject(HumanActionRepository)
    private readonly repository: IHumanActionRepository,
    private readonly gateway: HumanActionGateway,
  ) {}

  async create({
    type,
    start_time,
    end_time,
    uri,
    cctv_id,
  }: CreateHumanActionDTO): Promise<IHumanAction> {
    const agg = HumanAction.get({ type, start_time, end_time, uri, cctv_id });

    const result = await this.repository.save(agg);
    this.gateway.emitNewHumanActionEvent(
      this.repository.findOne(1, { cctv: true }),
    );
    return result;
  }

  async findOne({ id }: FindOneHumanActionDTO): Promise<IHumanAction> {
    return this.repository.findOne(id, { cctv: true });
  }

  async findMany(): Promise<IHumanAction[]> {
    return this.repository.findMany({ cctv: true });
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
