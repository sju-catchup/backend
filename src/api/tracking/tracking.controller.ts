import { Body, Controller, Get, Inject, Post } from '@nestjs/common';
import { CreateDTO, FindManySuspect } from './tracking.dto';
import { TrackingGateway } from './tracking.gateway';
import { TrackingService } from './tracking.service';

@Controller('tracking')
export class TrackingController {
  constructor(
    @Inject(TrackingService) private readonly service: TrackingService,
    private readonly gateway: TrackingGateway,
  ) {}

  @Post()
  create(@Body() { entities }: CreateDTO) {
    return this.service.create({ entities });
  }

  @Get('suspect')
  findMany(@Body() { start_time, end_time }: FindManySuspect) {
    return this.service.findMany({ start_time, end_time });
  }

  @Get('result')
  async findManyResult() {
    const result = await this.service.findResult();
    await this.gateway.emitTrackingResultEvent(result);
    return result;
  }
}
