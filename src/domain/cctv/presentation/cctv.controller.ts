import { Controller, Get } from '@nestjs/common';
import { CCTVService } from '../application/cctv.service';

@Controller('cctv')
export class CCTVController {
  constructor(private readonly cctvService: CCTVService) {}

  @Get('create')
  async create() {
    await this.cctvService.create();
    return '완료';
  }

  @Get('find')
  async findOne() {
    return this.cctvService.findOne();
  }
}
