import { Module } from '@nestjs/common';
import { BlogsService } from './blogs.service';
import { BlogsController } from './blogs.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Blog } from 'src/db/entities/blog.entity';
import { CategoryBlog } from 'src/db/entities/categoryBlog.entity';
import { fk_blog_to_category } from 'src/db/entities/fk_blog_to_category.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([CategoryBlog, Blog, fk_blog_to_category]),
  ],
  controllers: [BlogsController],
  providers: [BlogsService],
})
export class BlogsModule {}
