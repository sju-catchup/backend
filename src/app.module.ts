import { Module } from '@nestjs/common';
import { DomainModule } from './domain/domain.module';
import { InfrastructureModule } from './infrastructure/infrastructure.module';

@Module({
  imports: [InfrastructureModule, DomainModule],
  controllers: [],
  providers: [],
})
export class AppModule {}
