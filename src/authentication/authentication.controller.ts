import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import { AuthenticationService } from './authentication.service';
import { CreateAuthenticationDto } from './dto/create-authentication.dto';
import { UpdateAuthenticationDto } from './dto/update-authentication.dto';
import { LogInAuthenticationDto } from './dto/LogIn-authentication.dto';

@Controller('authentication')
export class AuthenticationController {
  constructor(private readonly authenticationService: AuthenticationService) {}

  @Post()
  @UsePipes(new ValidationPipe())
  async create(@Body() createAuthenticationDto: CreateAuthenticationDto) {
    return this.authenticationService.create(createAuthenticationDto);
  }

  @Get()
  async getProfiles() {
    return this.authenticationService.getALL();
  }

  @Post('/LogIn')
  @UsePipes(new ValidationPipe())
  LogIn(@Body() logInAuthenticationDto: LogInAuthenticationDto) {
    return this.authenticationService.LogIn(logInAuthenticationDto);
  }
}
