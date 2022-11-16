import { HumanAction } from './../domain/human-action.aggregate';
import { Inject, Injectable } from '@nestjs/common';
import { IHumanAction } from '../domain/human-action.interface';
import { IHumanActionRepository } from '../domain/repository.interface';
import { HumanActionRepository } from '../infrastructure/human-action.repository';
import {
  FindOneHumanActionDTO,
  RemoveHumanActionDTO,
  UpdateHumanActionDTO,
} from './human-action.dto';
import { HumanActionGateway } from '../presentation/human-action.gateway';
import { CreateHAList } from '../presentation/human-action.command';

@Injectable()
export class HumanActionService {
  constructor(
    @Inject(HumanActionRepository)
    private readonly repository: IHumanActionRepository,
    private readonly gateway: HumanActionGateway,
  ) {}

  async create({ has }: CreateHAList): Promise<IHumanAction[]> {
    const result: IHumanAction[] = [];
    for (const { cctv_id, url, type, start_time, end_time } of has) {
      const agg = HumanAction.get({ type, start_time, end_time, url, cctv_id });
      const ha = await this.repository.save(agg);
      result.push(ha);
      const HA = await this.repository.findOne(ha.id, { cctv: true });
      this.gateway.emitNewHumanActionEvent(HA);
    }
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
