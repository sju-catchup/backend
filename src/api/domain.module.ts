import { Module } from '@nestjs/common';
import { CCTVModule } from './cctv/cctv.module';
import { HumanActionModule } from './humanAction/human-action.module';

@Module({
  imports: [CCTVModule, HumanActionModule],
  controllers: [],
  providers: [],
})
export class DomainModule {}
