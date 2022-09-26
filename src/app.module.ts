import { Module } from '@nestjs/common';
import { DomainModule } from './domain/domain.module';
import { ConfigModule } from './infrastructure/config/config.module';
import { InfrastructureModule } from './infrastructure/infrastructure.module';

@Module({
  imports: [ConfigModule, InfrastructureModule, DomainModule],
  controllers: [],
  providers: [],
})
export class AppModule {}
