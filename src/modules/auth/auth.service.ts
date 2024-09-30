import {
  BadRequestException,
  ConflictException,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { UsersService } from '../users/users.service';
import { LogInAuthenticationDto } from './dto/LogIn-authentication.dto';
import { JwtService } from '@nestjs/jwt';
import { use } from 'passport';
import { CreateAuthenticationDto } from './dto/create-authentication.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Profile } from 'src/db/entities/authentication.entity';
import { Repository } from 'typeorm';
import { Role } from 'src/db/entities/roles.entity';

@Injectable()
export class AuthService {
  constructor(
    private usersService: UsersService,
    private jwtService: JwtService,
    @InjectRepository(Role)
    private roleRepository: Repository<Role>,
    @InjectRepository(Profile)
    private ProfileRepository: Repository<Profile>,
  ) {}
  async create(createAuthenticationDto: CreateAuthenticationDto) {
    const { username, password, confirmPassword } = createAuthenticationDto;

    if (confirmPassword === password) {
      const roleID = 2;
      const userRole = await this.roleRepository.findOne({
        where: { id: roleID },
      });
      const newProfile = this.ProfileRepository.create({
        username: username,
        password: password,
        roleID: userRole,
      });
      const existingProfile = await this.ProfileRepository.findOne({
        where: { username },
      });
      if (existingProfile) {
        return 'Пользователь с таким именем существует';
      }
      const savedProfile = await this.ProfileRepository.save(newProfile);
      const payload = {
        username: savedProfile.username,
        sub: savedProfile.id,
        role: savedProfile.roleID,
      };
      return { savedProfile, access_token: this.jwtService.sign(payload) };
    } else return 'Неверный пароль';
  }
  async getALL(user: any) {
    const Profiles = await this.ProfileRepository.find();
    return Profiles;
  }

  async login(user: any) {
    const payload = {
      username: user.username,
      sub: user.id,
      roles: user.roleID,
    };
    return {
      id: user.id,
      username: user.username,
      access_token: this.jwtService.sign(payload),
    };
  }

  async validateUser(username: string, password: string): Promise<any> {
    const user = await this.usersService.findOne(username);
    if (user && user.password === password) {
      return user;
    }
    throw new BadRequestException('User or password incorrect!');
  }
  async validateRole(username: string) {
    const roleID = 1;
    const userRole = await this.roleRepository.findOne({
      where: { id: roleID },
    });
    const user = await this.usersService.findOne(username);
    if (user.roleID === userRole) {
      return user;
    }
  }
}
