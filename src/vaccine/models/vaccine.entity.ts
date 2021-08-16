import {
  Column,
  Entity,
  PrimaryGeneratedColumn,
} from 'typeorm';

@Entity('vaccine')
export class VaccineEntity {
  @PrimaryGeneratedColumn('uuid')
  id: number;

  @Column({ default: '' })
  user_id: string;

  @Column({ default: '' })
  name: string;

  @Column({ type: 'int' })
  amount: number;

  @Column({ default: '' })
  email: string;

  @Column({ default: '' })
  tel: string;

  @Column({ type: 'real' })
  lat: number;

  @Column({ type: 'real' })
  long: number;

  @Column({ default: '' })
  description: string;

  @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
  createAt: Date;
}
