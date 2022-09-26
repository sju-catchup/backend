import { NestFactory } from '@nestjs/core';
import * as cookieParser from 'cookie-parser';
import helmet from 'helmet';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.use(helmet({ contentSecurityPolicy: true, hidePoweredBy: true }));
  app.use(cookieParser());
  await app.listen(process.env.PORT);
}
bootstrap();
