import { Entity, Column, PrimaryColumn } from 'typeorm';
@Entity()
export class CategoryBlog {
  @PrimaryColumn()
  id: number;

  @Column()
  name: string;
}
