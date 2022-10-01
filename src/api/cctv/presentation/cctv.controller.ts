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
import {
  CCTVArrayResponse,
  CCTVDeleteResponse,
  CCTVResponse,
} from './cctv.response';

@Controller('cctv')
export class CCTVController {
  constructor(private readonly cctvService: CCTVService) {}

  @Get()
  async findAll(): Promise<CCTVArrayResponse> {
    const CCTV: ICCTV[] = await this.cctvService.findMany();
    return { CCTV };
  }

  @Get(':cctv_id')
  async findOne(@Param('cctv_id') id: number): Promise<CCTVResponse> {
    const CCTV: ICCTV = await this.cctvService.findOne({ id });
    return { CCTV };
  }

  @Post()
  async create(@Body() body: CreateCCTVCommand): Promise<CCTVResponse> {
    const CCTV: ICCTV = await this.cctvService.create(body);
    return { CCTV };
  }

  @Patch(':cctv_id')
  async update(
    @Param('cctv_id') id: number,
    @Body() body: UpdateCCTVCommand,
  ): Promise<CCTVResponse> {
    const CCTV: ICCTV = await this.cctvService.update({ id }, body);
    return { CCTV };
  }

  @Delete(':cctv_id')
  async remove(@Param('cctv_id') id: number): Promise<CCTVDeleteResponse> {
    await this.cctvService.remove({ id });
    return { cctv_id: id };
  }
}
