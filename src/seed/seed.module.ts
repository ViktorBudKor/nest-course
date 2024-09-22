import { Module } from '@nestjs/common';
import { SeedService } from './seed.service';
import { CategoryBlog } from 'src/db/entities/categoryBlog.entity';
import { BlogsModule } from 'src/modules/blogs/blogs.module';
import { EntityModule } from 'src/db/entities/entity.module';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  imports: [TypeOrmModule.forFeature([CategoryBlog])],
  providers: [SeedService],
})
export class SeedModule {}
