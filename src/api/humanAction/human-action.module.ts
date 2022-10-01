import { HumanActionEntityMapper } from './infrastructure/human-action.mapper';
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { HumanActionEntity } from './infrastructure/model/human-action.entity';
import { HumanActionRepository } from './infrastructure/human-action.repository';

@Module({
  imports: [TypeOrmModule.forFeature([HumanActionEntity])],
  providers: [HumanActionEntityMapper, HumanActionRepository],
  controllers: [],
})
export class HumanActionModule {}
