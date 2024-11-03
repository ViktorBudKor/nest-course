import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  ManyToOne,
  JoinColumn,
} from 'typeorm';
import { Role } from './roles.entity';
import { OneToMany } from 'typeorm';
import { Garage } from './garage.entity';
@Entity()
export class Profile {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  username: string;

  @Column()
  password: string;

  @ManyToOne(() => Role, (role) => role.id, { eager: true })
  @JoinColumn({ name: 'role_id' })
  roleID: Role;
  @OneToMany(() => Garage, (garage) => garage.owner)
  garages: Garage[];
}
