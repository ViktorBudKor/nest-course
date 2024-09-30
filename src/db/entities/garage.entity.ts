import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  ManyToOne,
  JoinColumn,
  ManyToMany,
} from 'typeorm';
import { Profile } from './authentication.entity';
import { profile } from 'console';
import { Status } from './status.entity';
import { Equipment } from './equipment.entity';
@Entity()
export class Garage {
  @PrimaryGeneratedColumn()
  id: number;
  @ManyToOne(() => Profile, (profile) => profile.id)
  @JoinColumn({ name: 'Owner_id' })
  owner: Profile;
  @Column()
  street: string;
  @Column()
  numberOfSpaces: number;
  @Column()
  price: number;
  @ManyToOne(() => Status, (status) => status.id)
  @JoinColumn({ name: 'Status_id' })
  status: Status;
  @ManyToMany(() => Equipment, (equipment) => equipment.id)
  @JoinColumn({ name: 'Equipment_id' })
  equipment: Equipment[];
}
