import { TypeOrmModule as OriginalOrmModule } from '@nestjs/typeorm';

export const TypeOrmModule = OriginalOrmModule.forRoot({
  type: 'mysql',
  host: 'localhost',
  port: 3306,
  username: 'root',
  password: 'root',
  database: 'development',
  synchronize: true,
  logging: true,
  entities: [],
});
