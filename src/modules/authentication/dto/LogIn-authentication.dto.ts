import { IsString } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class LogInAuthenticationDto {
  @ApiProperty({ description: 'Existing username' })
  @IsString()
  username: string;
  @ApiProperty({ description: 'Correct password' })
  @IsString()
  password: string;
}
