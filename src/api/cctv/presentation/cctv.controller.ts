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

  @Post('create')
  async create(
    @Body() { position, address }: CreateCCTVCommand,
  ): Promise<CCTVResponse> {
    const dto: CreateCCTVDTO = { position, address };
    const CCTV: ICCTV = await this.cctvService.create(dto);
    return { CCTV };
  }

  @Get(':cctv_id')
  async findOne(@Param('cctv_id') id: number): Promise<CCTVResponse> {
    const CCTV: ICCTV = await this.cctvService.findOne({ id });
    return { CCTV };
  }

  @Patch(':cctv_id')
  async update(
    @Param('cctv_id') id: number,
    @Body() { position, address }: UpdateCCTVCommand,
  ): Promise<CCTVResponse> {
    const CCTV: ICCTV = await this.cctvService.update(
      { id },
      { position, address },
    );
    return { CCTV };
  }

  @Delete(':cctv_id')
  async remove(@Param('cctv_id') id: number): Promise<CCTVDeleteResponse> {
    await this.cctvService.remove({ id });
    return { cctv_id: id };
  }
}
