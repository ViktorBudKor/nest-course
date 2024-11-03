import { Injectable } from '@nestjs/common';
import { Profile } from 'src/db/entities/authentication.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(Profile)
    private profileRepository: Repository<Profile>,
  ) {}
  async findOne(username: string) {
    return await this.profileRepository.findOne({
      where: { username: username },
    });
  }
  async findOneByID(id: number) {
    return await this.profileRepository.findOne({
      where: { id: id },
    });
  }
  async getUserRole(username: string) {
    const user = await this.profileRepository.findOne({
      where: { username:username },
    });
    return user.roleID.name
  }
}
