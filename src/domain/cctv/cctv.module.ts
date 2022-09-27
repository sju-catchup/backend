import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CCTVEntityMapper } from './infrastructure/cctv.mapper';
import { CCTVRepository } from './infrastructure/cctv.repository';
import { CCTVEntity } from './infrastructure/model/cctv.entity';

@Module({
  imports: [TypeOrmModule.forFeature([CCTVEntity])],
  providers: [
    { provide: 'CCTVRepository', useClass: CCTVRepository },
    { provide: 'CCTVEntityMapper', useClass: CCTVEntityMapper },
  ],
  controllers: [],
})
export class CCTVModule {}
