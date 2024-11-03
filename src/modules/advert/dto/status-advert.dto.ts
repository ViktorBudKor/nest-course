import { ApiProperty, PartialType } from '@nestjs/swagger';
import { IsNumber, IsString } from 'class-validator';

export class StatusAdvertDto {
    @ApiProperty({ description: 'ID of garage, to change status' })
    @IsNumber()
    id:number;
    @ApiProperty({ description: '1 - Under consideration, 2 - Accepted, 3 - Denied ',
        minimum:1,
        maximum: 3
     })
    @IsNumber()
    status:number;
  
}
