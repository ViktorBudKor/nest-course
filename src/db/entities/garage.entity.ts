import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  ManyToOne,
  JoinColumn,
  ManyToMany,JoinTable
} from 'typeorm';
import { User } from './authentication.entity';
import { Status } from './status.entity';
import { Equipment } from './equipment.entity';
@Entity()
export class Garage {
  @PrimaryGeneratedColumn()
  id: number;

  // Связь с User
  @ManyToOne(() => User, (user) => user.garages, { eager: true })
  @JoinColumn({ name: 'owner_id' }) // Указываем внешний ключ
  owner: User;

  @Column({ unique: true })
  street: string;

  @Column()
  numberOfSpaces: number;

  @Column()
  price: number;

  @Column()
  isPublished: boolean;

  // Связь с Status
  @ManyToOne(() => Status, (status) => status.id, { eager: true })
  @JoinColumn({ name: 'status_id' }) // Указываем внешний ключ для статуса
  status: Status;

  // Связь с Equipment через ManyToMany
  @ManyToMany(() => Equipment, (equipment) => equipment.garages, { eager: true })
  @JoinTable() // ManyToMany связь использует JoinTable
  equipment: Equipment[];
}

