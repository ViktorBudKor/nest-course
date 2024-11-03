import { ApiProperty, PartialType } from '@nestjs/swagger';
import { CreateAdvertDto } from './create-advert.dto';
import { IsNumber, IsString } from 'class-validator';

export class PublishedAdvertDto{
    @ApiProperty({ description: 'ID of garage, to switch IsPublished on opposite' })
    @IsNumber()
    id:number;
}