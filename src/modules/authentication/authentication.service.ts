import {
  ConflictException,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { CreateAuthenticationDto } from './dto/create-authentication.dto';
import { UpdateAuthenticationDto } from './dto/update-authentication.dto';
import { LogInAuthenticationDto } from './dto/LogIn-authentication.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Profile } from '../../db/entities/authentication.entity';
import { ApiResponse } from '@nestjs/swagger';

@Injectable()
export class AuthenticationService {
  constructor(
    @InjectRepository(Profile)
    private ProfileRepository: Repository<Profile>,
  ) {}

  async create(createAuthenticationDto: CreateAuthenticationDto) {
    const { username, password, confirmPassword } = createAuthenticationDto;

    if (confirmPassword === password) {
      const newProfile = this.ProfileRepository.create({
        username: username,
        password: password,
      });
      const existingProfile = await this.ProfileRepository.findOne({
        where: { username },
      });
      if (existingProfile) {
        return 'Пользователь с таким именем существует';
      }
      const savedProfile = await this.ProfileRepository.save(newProfile);
      return savedProfile;
    } else return 'Неверный пароль';
  }

  async getALL() {
    const Profiles = await this.ProfileRepository.find();
    return Profiles;
  }

  async LogIn(dto: LogInAuthenticationDto) {
    const { username, password } = dto;
    const LogInProfile = await this.ProfileRepository.findOne({
      where: { username },
    });
    if (LogInProfile) {
      if (LogInProfile.password !== password) {
        throw new ConflictException('Неверный пароль');
      }
      return 'Вы вошли!';
    }
    throw new UnauthorizedException(
      'Пользователя с таким username не существует',
    );
  }
}
