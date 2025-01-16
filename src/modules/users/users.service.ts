import { Injectable } from '@nestjs/common';
import { User } from 'src/db/entities/authentication.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User)
    private UserRepository: Repository<User>,
  ) {}
  async findOne(username: string) {
    return await this.UserRepository.findOne({
      where: { username: username },
    });
  }
  async findOneByID(id: number) {
    return await this.UserRepository.findOne({
      where: { id: id },
    });
  }
  async getUserRole(username: string) {
    const user = await this.UserRepository.findOne({
      where: { username:username },
    });
    return user.roleID.name
  }
}
