import { Entity, Column, PrimaryColumn, OneToMany } from 'typeorm';
import { Garage } from './garage.entity';

@Entity()
export class Status {
  @PrimaryColumn()
  id: number;

  @Column()
  name: string;
}
