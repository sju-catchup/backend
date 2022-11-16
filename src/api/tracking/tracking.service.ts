import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Between, Repository } from 'typeorm';
import { CreateDTO, FindManySuspect } from './tracking.dto';
import { TrackingEntity } from './tracking.entity';
import { TrackingGateway } from './tracking.gateway';

@Injectable()
export class TrackingService {
  constructor(
    @InjectRepository(TrackingEntity)
    private readonly repository: Repository<TrackingEntity>,
    private readonly gateway: TrackingGateway,
  ) {}

  async create({ entities }: CreateDTO) {
    const result: TrackingEntity[] = [];
    for (const { time, type, cctv_id, url } of entities) {
      const entity = new TrackingEntity();
      entity.cctv_id = cctv_id;
      entity.time = time;
      entity.type = type;
      entity.url = url;
      const track = await this.repository.save(entity);
      result.push(track);
      await this.gateway.emitTrackingResultEvent(track);
    }
    return result;
  }

  findOne(id: number) {
    return this.repository.findOne({
      where: { id, type: 'Result' },
      relations: { cctv: true },
    });
  }

  findMany({ start_time, end_time, cctv_id }: FindManySuspect) {
    return this.repository.find({
      where: { type: 'Suspect', cctv_id, time: Between(start_time, end_time) },
      relations: { cctv: true },
    });
  }
}
