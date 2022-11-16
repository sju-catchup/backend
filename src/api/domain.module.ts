import { Module } from '@nestjs/common';
import { CCTVModule } from './cctv/cctv.module';
import { HumanActionModule } from './humanAction/human-action.module';
import { TrackingModule } from './tracking/tracking.module';

@Module({
  imports: [CCTVModule, HumanActionModule, TrackingModule],
  controllers: [],
  providers: [],
})
export class DomainModule {}
