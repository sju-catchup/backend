import {
  Body,
  Controller,
  Get,
  Inject,
  NotFoundException,
  Param,
  Post,
} from '@nestjs/common';
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

  @Post('suspect')
  async findMany(@Body() { start_time, end_time, cctv_id }: FindManySuspect) {
    return {
      Suspect: await this.service.findMany({ start_time, end_time, cctv_id }),
    };
  }

  @Get(':tracking_id')
  async findOne(@Param('tracking_id') id: number) {
    const result = await this.service.findOne(+id);
    if (result == null) {
      throw new NotFoundException('정보 없음');
    }
    await this.gateway.emitTrackingResultEvent(result);
    return result;
  }
}
