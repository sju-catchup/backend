import { IsBoolean, IsDate, IsNumber, IsString, IsUrl } from 'class-validator';
import { ICCTVId } from 'src/api/cctv/domain/cctv.interface';
import { CCTVEntity } from 'src/api/cctv/infrastructure/model/cctv.entity';
import { TypeOrmRootEntity } from 'src/api/common/entitiy.base';
import { Column, Entity, ManyToOne, RelationId } from 'typeorm';

@Entity()
export class HumanActionEntity extends TypeOrmRootEntity {
  @Column()
  @IsString()
  type: string;

  @Column()
  @IsDate()
  start_time: Date;

  @Column()
  @IsDate()
  end_time: Date;

  @Column()
  @IsUrl()
  uri: string;

  @RelationId((entity: HumanActionEntity) => entity.cctv)
  @IsNumber()
  cctv_id: ICCTVId;

  @ManyToOne(() => CCTVEntity)
  cctv: CCTVEntity;

  @Column({ default: true })
  @IsBoolean()
  visible: boolean;
}
