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

  static create({
    x,
    y,
    address,
    id,
    createdAt,
    updatedAt,
  }: CCTVEntity): CCTVEntity {
    const entity = new CCTVEntity();
    entity.id = id;
    entity.address = address;
    entity.x = x;
    entity.y = y;
    entity.createdAt = createdAt;
    entity.updatedAt = updatedAt;
    return entity;
  }
}
