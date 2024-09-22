import { IsString, IsNumber } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';
export class CreateBlogDto {
  @ApiProperty({ description: 'Title of blog' })
  @IsString()
  title: string;
  @ApiProperty({ description: 'Text with a sense' })
  @IsString()
  text: string;
  @ApiProperty({ description: 'CategoryID from /categories' })
  @IsNumber()
  CategoryID: number;
}
