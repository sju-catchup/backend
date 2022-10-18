import { HumanActionEntityMapper } from './infrastructure/human-action.mapper';
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { HumanActionEntity } from './infrastructure/model/human-action.entity';
import { HumanActionRepository } from './infrastructure/human-action.repository';
import { HumanActionController } from './presentation/human-action.controller';
import { HumanActionService } from './application/human-action.service';
import { HumanActionGateway } from './presentation/human-action.gateway';

@Module({
  imports: [TypeOrmModule.forFeature([HumanActionEntity])],
  providers: [
    HumanActionEntityMapper,
    HumanActionRepository,
    HumanActionService,
    HumanActionGateway,
  ],
  controllers: [HumanActionController],
})
export class HumanActionModule {}
