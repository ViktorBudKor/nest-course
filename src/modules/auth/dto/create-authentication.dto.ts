import { IsNumber, IsString } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreateAuthenticationDto {
  @ApiProperty({ description: 'NOT existing username' })
  @IsString()
  username: string;
  @ApiProperty({ description: 'New password for user' })
  @IsString()
  password: string;
  @ApiProperty({ description: 'Confirm password ' })
  @IsString()
  confirmPassword: string;
  // @ApiProperty({ description: 'Role id; ' })
  // @IsNumber()
  // roleID: number;
}
