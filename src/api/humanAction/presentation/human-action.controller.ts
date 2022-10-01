import { Body, Controller, Get, Param, Patch } from '@nestjs/common';
import { HumanActionService } from '../application/human-action.service';
import { UpdateHumanActionCommand } from './human-action.command';
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

  @Patch(':human_action_id')
  async update(
    @Param('human_action_id') id: number,
    @Body() { type }: UpdateHumanActionCommand,
  ): Promise<HumanActionResponse> {
    const HumanAction = await this.humanActionService.update({ id }, { type });
    return { HumanAction };
  }
}
