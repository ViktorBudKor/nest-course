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
import { CreateAuthenticationDto } from '../auth/dto/create-authentication.dto';
import { UpdateAuthenticationDto } from '../auth/dto/update-authentication.dto';
import { LogInAuthenticationDto } from '../auth/dto/LogIn-authentication.dto';
import { ApiResponse, ApiTags } from '@nestjs/swagger';

@Controller('authentication')
export class AuthenticationController {
  constructor(private readonly authenticationService: AuthenticationService) {}

  @Post()
  @ApiResponse({
    status: 201,
    description: 'The user has been successfully created.',
  })
  @UsePipes(new ValidationPipe())
  async create(@Body() createAuthenticationDto: CreateAuthenticationDto) {
    return this.authenticationService.create(createAuthenticationDto);
  }

  @Get()
  async getProfiles() {
    return this.authenticationService.getALL();
  }

  @Post('/LogIn')
  @ApiResponse({ status: 409, description: 'You entered invalid password.' })
  @ApiResponse({
    status: 401,
    description: 'You entered NOT existing username.',
  })
  @UsePipes(new ValidationPipe())
  LogIn(@Body() logInAuthenticationDto: LogInAuthenticationDto) {
    return this.authenticationService.LogIn(logInAuthenticationDto);
  }
}
