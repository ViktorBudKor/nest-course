import { Entity, Column, PrimaryColumn } from 'typeorm';

@Entity()
export class Status {
  @PrimaryColumn()
  id: number;

  @Column()
  name: string;
}
