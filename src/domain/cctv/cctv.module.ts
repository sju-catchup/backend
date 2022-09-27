import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CCTVService } from './application/cctv.service';
import { CCTVEntityMapper } from './infrastructure/cctv.mapper';
import { CCTVRepository } from './infrastructure/cctv.repository';
import { CCTVEntity } from './infrastructure/model/cctv.entity';
import { CCTVController } from './presentation/cctv.controller';

@Module({
  imports: [TypeOrmModule.forFeature([CCTVEntity])],
  providers: [CCTVRepository, CCTVEntityMapper, CCTVService],
  controllers: [CCTVController],
})
export class CCTVModule {}
