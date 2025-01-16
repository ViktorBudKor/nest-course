import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { ProfileService } from './profile.service';
import { CreateProfileDto } from './dto/create-profile.dto';
import { UpdateProfileDto } from './dto/update-profile.dto';
import { Request } from '@nestjs/common';
import { UseGuards } from '@nestjs/common';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';

@Controller('profile')
export class ProfileController {
  constructor(private readonly profileService: ProfileService) {}


  @UseGuards(JwtAuthGuard)
  @Patch('update')
  update(@Body() updateProfileDto: UpdateProfileDto, @Request() req) {
    return this.profileService.update(req.user, updateProfileDto);
  }

  @UseGuards(JwtAuthGuard)
  @Get('confirmEmail')
  confirmEmail(@Request() req){
      return this.profileService.sendMail(req.user)
  }
  @Patch(':token')
  confirmMail(@Param('token') token: string) {
    return this.profileService.confirmMail(token);
  }
}
