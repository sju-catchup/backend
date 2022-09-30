import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
} from '@nestjs/common';
import { CreateCCTVDTO } from '../application/cctv.dto';
import { CCTVService } from '../application/cctv.service';
import { ICCTV } from '../domain/cctv.interface';
import { CreateCCTVCommand, UpdateCCTVCommand } from './cctv.command';
import { CCTVDeleteResponse, CCTVResponse } from './cctv.response';

@Controller('cctv')
export class CCTVController {
  constructor(private readonly cctvService: CCTVService) {}

  @Get()
  async findAll(): Promise<ICCTV[]> {
    return this.cctvService.findMany();
  }

  @Post('create')
  async create(
    @Body() { position, address }: CreateCCTVCommand,
  ): Promise<ICCTV> {
    const dto: CreateCCTVDTO = { position, address };
    return this.cctvService.create(dto);
  }

  @Get(':cctv_id')
  async findOne(@Param('cctv_id') id: number): Promise<CCTVResponse> {
    const cctv = await this.cctvService.findOne({ id });
    return { cctv };
  }

  @Patch(':cctv_id')
  async update(
    @Param('cctv_id') id: number,
    @Body() { position, address }: UpdateCCTVCommand,
  ): Promise<CCTVResponse> {
    const cctv = await this.cctvService.update({ id }, { position, address });
    return { cctv };
  }

  @Delete(':cctv_id')
  async remove(@Param('cctv_id') id: number): Promise<CCTVDeleteResponse> {
    await this.cctvService.remove({ id });
    return { cctv_id: id };
  }
}
