import { ConfigModule as OriginalConfigModule } from '@nestjs/config';
import * as Joi from 'joi';

const validationSchema = Joi.object<any, false, IEnv>({
  NODE_ENV: Joi.string()
    .valid('development', 'production', 'test')
    .default('development'),
  PORT: Joi.number().default(4000),
});

export const ConfigModule = OriginalConfigModule.forRoot({
  isGlobal: true,
  cache: true,
  envFilePath: '.env',
  ignoreEnvFile: process.env.NODE_ENV === 'production',
  validationOptions: {
    abortEarly: true,
  },
  validationSchema,
});
