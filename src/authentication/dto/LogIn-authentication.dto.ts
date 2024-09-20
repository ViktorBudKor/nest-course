import { IsString } from 'class-validator';
export class LogInAuthenticationDto {
  @IsString()
  username: string;
  @IsString()
  password: string;
}
