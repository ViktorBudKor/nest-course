import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UsePipes,
  ParseIntPipe,
} from '@nestjs/common';
import { BlogsService } from './blogs.service';
import { CreateBlogDto } from './dto/create-blog.dto';
import { UpdateBlogDto } from './dto/update-blog.dto';
import { ValidationPipe } from '@nestjs/common';
import { ApiResponse, ApiTags } from '@nestjs/swagger';

@Controller('blogs')
@ApiTags('Blogs')
export class BlogsController {
  constructor(private readonly blogsService: BlogsService) {}

  @Post('/newBlog')
  @ApiResponse({
    status: 201,
    description: 'The blog has been successfully created.',
  })
  @ApiResponse({ status: 409, description: 'CategoryID does NOT exist.' })
  @UsePipes(new ValidationPipe())
  create(@Body() createBlogDto: CreateBlogDto) {
    return this.blogsService.create(createBlogDto);
  }

  @Get('/categories')
  findAllCat() {
    return this.blogsService.findAllCat();
  }
  @Get()
  findAllBlogs() {
    return this.blogsService.findAllBlogs();
  }

  @Delete('/removeAllBlogs')
  removeAllBlogs(@Param('id') id: string) {
    return this.blogsService.removeAllBlogs();
  }
  @Delete('/removeBlogsById/:id')
  @ApiResponse({ status: 404, description: 'Blog with this ID  NOT found.' })
  @ApiResponse({
    status: 400,
    description: 'Validation failde(id must be numeric).',
  })
  removeBlogsByID(@Param('id', ParseIntPipe) id: number) {
    return this.blogsService.removeBlogsByID(id);
  }
}
