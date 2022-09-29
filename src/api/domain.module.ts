import { Module } from '@nestjs/common';
import { CCTVModule } from './cctv/cctv.module';

@Module({
  imports: [CCTVModule],
  controllers: [],
  providers: [],
})
export class DomainModule {}
