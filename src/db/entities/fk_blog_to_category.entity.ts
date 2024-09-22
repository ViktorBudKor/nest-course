import {
  Entity,
  Column,
  PrimaryColumn,
  OneToOne,
  PrimaryGeneratedColumn,
  JoinColumn,
  ManyToOne,
} from 'typeorm';
import { CategoryBlog } from './categoryBlog.entity';
import { Blog } from './blog.entity';
@Entity()
export class fk_blog_to_category {
  @PrimaryGeneratedColumn()
  id: number;
  @OneToOne(() => Blog, (blog) => blog.id, { onDelete: 'CASCADE' })
  @JoinColumn({ name: 'blog_id' })
  blogID: Blog;

  @ManyToOne(() => CategoryBlog, (category) => category.id)
  @JoinColumn({ name: 'category_id' })
  categoryID: CategoryBlog;
}
