import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
} from '@nestjs/common';
import { HumanActionService } from '../application/human-action.service';
import { IHumanAction } from '../domain/human-action.interface';
import { UpdateHumanActionCommand, CreateHAList } from './human-action.command';
import { HumanActionGateway } from './human-action.gateway';
import {
  HumanActionArrayResponse,
  HumanActionDeleteResponse,
  HumanActionResponse,
} from './human-action.response';

@Controller('human-action')
export class HumanActionController {
  constructor(
    private readonly humanActionService: HumanActionService,
    private readonly gateway: HumanActionGateway,
  ) {}

  @Get()
  async findAll(): Promise<HumanActionArrayResponse> {
    const HumanAction: IHumanAction[] =
      await this.humanActionService.findMany();
    return { HumanAction };
  }

  @Get('socket-test')
  async test(): Promise<HumanActionResponse> {
    const humanAction: IHumanAction = await this.humanActionService.findOne({
      id: 1,
    });
    this.gateway.emitNewHumanActionEvent({
      ...humanAction,
      id: 100,
      createdAt: new Date(),
    });
    return { HumanAction: { ...humanAction, id: 100, createdAt: new Date() } };
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
  async create(@Body() { has }: CreateHAList) {
    const HumanAction: IHumanAction[] = await this.humanActionService.create({
      has,
    });
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

  @Delete(':human_action_id')
  async remove(
    @Param('human_action_id') id: number,
  ): Promise<HumanActionDeleteResponse> {
    await this.humanActionService.remove({ id });
    return { human_action_id: id };
  }
}
