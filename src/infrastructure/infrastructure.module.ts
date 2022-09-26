import { Module } from '@nestjs/common';
import { APP_FILTER, APP_PIPE } from '@nestjs/core';
import { AllExceptionFilter } from './filter/all.exception.filter';
import { ValidationPipe } from './pipe/validation.pipe';

@Module({
  imports: [],
  controllers: [],
  providers: [
    { provide: APP_FILTER, useClass: AllExceptionFilter },
    { provide: APP_PIPE, useClass: ValidationPipe },
  ],
})
export class InfrastructureModule {}
