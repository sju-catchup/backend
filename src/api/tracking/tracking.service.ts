import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Between, Repository } from 'typeorm';
import { CreateDTO } from './tracking.dto';
import { TrackingEntity } from './tracking.entity';
import { TrackingGateway } from './tracking.gateway';

interface FindMany {
  start_time: Date;
  end_time: Date;
}

@Injectable()
export class TrackingService {
  constructor(
    @InjectRepository(TrackingEntity)
    private readonly repository: Repository<TrackingEntity>,
    private readonly gateway: TrackingGateway,
  ) {}

  async create({ entities }: CreateDTO) {
    const promises: Promise<TrackingEntity>[] = [];

    for (const { time, type, cctv_id, url } of entities) {
      const entity = new TrackingEntity();
      entity.cctv_id = cctv_id;
      entity.time = time;
      entity.type = type;
      entity.url = url;
      promises.push(this.repository.save(entity));
    }
    const result = await Promise.all(promises);
    await this.gateway.emitTrackingResultEvent(result);
    return result;
  }

  findResult() {
    return this.repository.find({
      where: { type: 'Result' },
      relations: { cctv: true },
    });
  }

  findMany({ start_time, end_time }: FindMany) {
    return this.repository.find({
      where: { type: 'Suspect', time: Between(start_time, end_time) },
      relations: { cctv: true },
    });
  }
}
