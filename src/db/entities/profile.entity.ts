import { Entity, Column, OneToOne, PrimaryColumn, IsNull, JoinColumn } from 'typeorm';
import { User } from './authentication.entity';
@Entity()
export class Profile {
  @PrimaryColumn()
  userId: number;

  @Column({ default: 'firstName' })
  frstName: string;

  @Column({ default: 'secondName' })
  secName: string;

  @Column({ default: 'patronymic' })
  patronymic: string;

  @OneToOne(() => User, (user) => user.profile,{
    onDelete: 'CASCADE', // Удаляет Profile, если User удален
    onUpdate: 'CASCADE',
  }) // Связь с User
  @JoinColumn() // Указывает, что это ключ связи
  user: User;

  @Column({ unique: true })
  email: string;

  @Column({nullable:true})
  phone: string;

  @Column({ type: 'date', nullable:true})
  DOB: string;

  @Column({nullable:true})
  sex: string;
  
  @Column({ default: false })
  is_verifed_email: boolean;
}
// @PrimaryGeneratedColumn()
// id: number;
// @Column()
// username: string;

// @Column()
// password: string;

// @ManyToOne(() => Role, (role) => role.id, { eager: true })
// @JoinColumn({ name: 'role_id' })
// roleID: Role;

// @OneToMany(() => Garage, (garage) => garage.owner)
// garages: Garage[];
