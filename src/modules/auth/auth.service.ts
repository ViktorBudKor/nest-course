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
import { User } from 'src/db/entities/authentication.entity';
import { Repository } from 'typeorm';
import { Role } from 'src/db/entities/roles.entity';
import { Profile } from 'src/db/entities/profile.entity';

@Injectable()
export class AuthService {
  constructor(
    private usersService: UsersService,
    private jwtService: JwtService,
    @InjectRepository(Role)
    private roleRepository: Repository<Role>,
    @InjectRepository(User)
    private UserRepository: Repository<User>,
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
      const newUser = this.UserRepository.create({
        username: username,
        password: password,
        roleID: userRole,
      });
      const existingProfile = await this.UserRepository.findOne({
        where: { username },
      });
      if (existingProfile) {
        return 'Пользователь с таким именем существует';
      }
      const savedUser = await this.UserRepository.save(newUser);
      const newProfile = await this.ProfileRepository.create({
        userId:savedUser.id,
        email: `${savedUser.username}@youremail.com`,
        DOB:null,
        sex:null

      })
      await this.ProfileRepository.save(newProfile)
      const payload = {
        username: savedUser.username,
        sub: savedUser.id,
        role: savedUser.roleID,
      };
      return { username:savedUser.username,roleID, access_token: this.jwtService.sign(payload) };
    } else return 'Неверный пароль';
  }
  async getALL(user: any) {
    const Profiles = await this.UserRepository.find();
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
