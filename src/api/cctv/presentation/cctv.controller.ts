import { Controller, Get } from '@nestjs/common';
import { CCTVService } from '../application/cctv.service';

@Controller('cctv')
export class CCTVController {
  constructor(private readonly cctvService: CCTVService) {}

  @Get('create')
  async create() {
    const cctv = await this.cctvService.create();
    return cctv;
  }

  @Get('find')
  async findOne() {
    const result = await this.cctvService.findOne();
    return result;
  }
}
