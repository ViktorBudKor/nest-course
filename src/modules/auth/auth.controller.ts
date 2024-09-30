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
  UseGuards,
  Request,
} from '@nestjs/common';
import { AuthService } from './auth.service';
import { CreateAuthenticationDto } from './dto/create-authentication.dto';
import { UpdateAuthenticationDto } from './dto/update-authentication.dto';
import { LogInAuthenticationDto } from './dto/LogIn-authentication.dto';
import { ApiResponse, ApiTags } from '@nestjs/swagger';
import { AuthGuard } from '@nestjs/passport';
import { JwtAuthGuard } from './guards/jwt-auth.guard';
import { RolesGuard } from './guards/roles.guard';
import { Roles } from 'src/decorators/roles.decorator';
// import { RoleAdminGuard } from './guards/admin-auth.guard';

@Controller('auth')
@ApiTags('Auth')
export class AuthController {
  constructor(private authService: AuthService) {}
  @Post('/reg')
  @ApiResponse({
    status: 201,
    description: 'The user has been successfully created.',
  })
  @UsePipes(new ValidationPipe())
  async create(@Body() createAuthenticationDto: CreateAuthenticationDto) {
    return this.authService.create(createAuthenticationDto);
  }

  @UseGuards(JwtAuthGuard)
  @Get('/profiles')
  async getProfiles(@Request() req) {
    return this.authService.getALL(req.user);
  }

  @UsePipes(new ValidationPipe({ transform: true }))
  @UseGuards(AuthGuard('local'))
  @Post('/login')
  async login(@Request() req) {
    return this.authService.login(req.user);
  }
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(['admin'])
  @Get()
  async test(@Request() req) {
    return { message: 1 };
  }

  @UseGuards(JwtAuthGuard)
  @Get('/profile')
  getProfile(@Request() req) {
    return req.user;
  }
}
