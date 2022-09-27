import { IsDate } from 'class-validator';
import { Column, Entity, PrimaryColumn } from 'typeorm';
import { IEntity } from './model.base';

@Entity()
export abstract class TypeOrmRootEntity implements IEntity<string> {
  @PrimaryColumn()
  id: string;

  @Column()
  @IsDate()
  createdAt: Date;

  @Column()
  @IsDate()
  updatedAt: Date;
}
