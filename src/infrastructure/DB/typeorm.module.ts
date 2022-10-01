import { ConfigModule, ConfigService } from '@nestjs/config';
import { TypeOrmModule as OriginalOrmModule } from '@nestjs/typeorm';
import { DataSource } from 'typeorm';

export const TypeOrmModule = OriginalOrmModule.forRootAsync({
  imports: [ConfigModule],
  inject: [ConfigService],
  useFactory: async (configService: ConfigService<IEnv>) => ({
    type: 'mysql',
    host: configService.get('DB_HOST'),
    port: parseInt(configService.get('DB_PORT')),
    username: configService.get('DB_USERNAME'),
    password: configService.get('DB_PASSWORD'),
    database: configService.get('DB_DATABASE'),
    synchronize: true,
    logging: true,
    entities: ['dist/**/*.entity{.ts,.js}'],
  }),
  dataSourceFactory: async (option) => {
    const dataSource = await new DataSource(option).initialize();
    return dataSource;
  },
});
