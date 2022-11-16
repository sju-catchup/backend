import { Column, Entity, JoinColumn, ManyToOne } from 'typeorm';
import { CCTVEntity } from '../cctv/infrastructure/model/cctv.entity';
import { TypeOrmRootEntity } from '../common/entitiy.base';

@Entity({ name: 'trackings' })
export class TrackingEntity extends TypeOrmRootEntity {
  @Column()
  cctv_id: number;

  @ManyToOne(() => CCTVEntity)
  @JoinColumn({ name: 'cctv_id' })
  cctv: CCTVEntity;

  @Column()
  time: Date;

  @Column()
  url: string;

  @Column()
  type: 'Suspect' | 'Result';
}
