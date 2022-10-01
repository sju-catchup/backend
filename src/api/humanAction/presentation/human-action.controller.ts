import { Controller, Get, Param } from '@nestjs/common';
import { HumanActionService } from '../application/human-action.service';
import {
  HumanActionArrayResponse,
  HumanActionResponse,
} from './human-action.response';

@Controller('human-action')
export class HumanActionController {
  constructor(private readonly humanActionService: HumanActionService) {}

  @Get()
  async findAll(): Promise<HumanActionArrayResponse> {
    const HumanAction = await this.humanActionService.findMany();
    return { HumanAction };
  }

  @Get(':human_action_id')
  async findOne(
    @Param('human_action_id') id: number,
  ): Promise<HumanActionResponse> {
    const HumanAction = await this.humanActionService.findOne({ id });
    return { HumanAction };
  }
}
