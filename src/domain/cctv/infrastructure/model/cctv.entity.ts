import { IsString } from 'class-validator';
import { TypeOrmRootEntity } from 'src/domain/common/entitiy.base';
import { Column, Entity } from 'typeorm';

@Entity()
export class CCTVEntity extends TypeOrmRootEntity {
  @Column()
  @IsString()
  x: string;

  @Column()
  @IsString()
  y: string;

  @Column()
  @IsString()
  address: string;
}
