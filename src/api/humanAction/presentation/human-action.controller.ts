import { Body, Controller, Get, Param, Patch, Post } from '@nestjs/common';
import { HumanActionService } from '../application/human-action.service';
import { IHumanAction } from '../domain/human-action.interface';
import {
  CreateHumanActionCommand,
  UpdateHumanActionCommand,
} from './human-action.command';
import {
  HumanActionArrayResponse,
  HumanActionResponse,
} from './human-action.response';

@Controller('human-action')
export class HumanActionController {
  constructor(private readonly humanActionService: HumanActionService) {}

  @Get()
  async findAll(): Promise<HumanActionArrayResponse> {
    const HumanAction: IHumanAction[] =
      await this.humanActionService.findMany();
    return { HumanAction };
  }

  @Get(':human_action_id')
  async findOne(
    @Param('human_action_id') id: number,
  ): Promise<HumanActionResponse> {
    const HumanAction: IHumanAction = await this.humanActionService.findOne({
      id,
    });
    return { HumanAction };
  }

  @Post()
  async create(
    @Body() body: CreateHumanActionCommand,
  ): Promise<HumanActionResponse> {
    const HumanAction: IHumanAction = await this.humanActionService.create(
      body,
    );
    return { HumanAction };
  }

  @Patch(':human_action_id')
  async update(
    @Param('human_action_id') id: number,
    @Body() body: UpdateHumanActionCommand,
  ): Promise<HumanActionResponse> {
    const HumanAction: IHumanAction = await this.humanActionService.update(
      { id },
      body,
    );
    return { HumanAction };
  }
}
