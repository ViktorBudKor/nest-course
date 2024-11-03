import { Entity, Column, PrimaryColumn,OneToMany } from 'typeorm';
import { Garage } from './garage.entity';

@Entity()
export class Equipment {
  @PrimaryColumn()
  id: number;

  @Column()
  name: string;
  @OneToMany(() => Garage, (garage) => garage.owner)
  garages: Garage[];
}
