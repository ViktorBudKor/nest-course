import {
  ConflictException,
  HttpException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { CreateBlogDto } from './dto/create-blog.dto';
import { UpdateBlogDto } from './dto/update-blog.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Blog } from 'src/db/entities/blog.entity';
import { CategoryBlog } from 'src/db/entities/categoryBlog.entity';
import { ApiOkResponse } from '@nestjs/swagger';
import { fk_blog_to_category } from 'src/db/entities/fk_blog_to_category.entity';

@Injectable()
export class BlogsService {
  constructor(
    @InjectRepository(CategoryBlog)
    private CategoryBlogRepository: Repository<CategoryBlog>,
    @InjectRepository(fk_blog_to_category)
    private BlogToCategoryRepository: Repository<fk_blog_to_category>,
    @InjectRepository(Blog)
    private BlogRepository: Repository<Blog>,
  ) {}

  async create(createBlogDto: CreateBlogDto) {
    const { title, text, CategoryID } = createBlogDto;
    const blog = this.BlogRepository.create({ title: title, text: text });

    const category = await this.CategoryBlogRepository.findOne({
      where: { id: CategoryID },
    });
    if (!category) {
      throw new ConflictException('Такой категории не существует');
    }
    const newBlog = await this.BlogRepository.save(blog);

    const blogToCat = new fk_blog_to_category();
    blogToCat.blogID = newBlog;
    blogToCat.categoryID = category;
    await this.BlogToCategoryRepository.save(blogToCat);

    return newBlog;
  }

  async findAllCat() {
    const categories = await this.CategoryBlogRepository.find();
    return categories;
  }
  async findAllBlogs() {
    const blogs = await this.BlogRepository.find();
    return blogs;
  }
  async removeAllBlogs() {
    await this.BlogRepository.delete({});

    return { message: 'All Blogs deleted' };
  }
  async removeBlogsByID(id: number) {
    const blogs = await this.BlogRepository.findOne({ where: { id: id } });
    if (!blogs) {
      throw new NotFoundException('Blog with this ID not found');
    }
    await this.BlogRepository.delete({ id });
    return 'Блог удален';
  }

  findOne(id: number) {
    return `This action returns a #${id} blog`;
  }

  update(id: number, updateBlogDto: UpdateBlogDto) {
    return `This action updates a #${id} blog`;
  }
}
//@Column({ unique: true })
