import { Module } from '@nestjs/common';
import { CategoryBlog } from 'src/db/entities/categoryBlog.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { BlogsModule } from 'src/modules/blogs/blogs.module';
import { Blog } from './blog.entity';
import { fk_blog_to_category } from './fk_blog_to_category.entity';
import { BlogsService } from 'src/modules/blogs/blogs.service';

@Module({
  imports: [TypeOrmModule.forFeature([Blog, CategoryBlog])],
  exports: [TypeOrmModule],
})
export class EntityModule {}
