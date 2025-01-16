import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  ManyToOne,
  JoinColumn,
  OneToOne,
} from 'typeorm';
import { Role } from './roles.entity';
import { OneToMany } from 'typeorm';
import { Garage } from './garage.entity';
import { Profile } from './profile.entity';
@Entity()
export class User {
  @PrimaryGeneratedColumn()
  id: number;

  @OneToOne(() => Profile, (profile) => profile.user,{
    onDelete: 'CASCADE', // Удаляет Profile, если User удален
    onUpdate: 'CASCADE',
  }) // Двусторонняя связь
  profile: Profile;

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
