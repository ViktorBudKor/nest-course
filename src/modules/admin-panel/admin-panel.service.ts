import { ConflictException, ForbiddenException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from 'src/db/entities/authentication.entity';
import { Repository } from 'typeorm';
import { Profile } from 'src/db/entities/profile.entity';
import { Like } from 'typeorm';
import { Role } from 'src/db/entities/roles.entity';
import { error } from 'console';

@Injectable()
export class AdminPanelService {
  constructor(
   @InjectRepository(User)
   private userRepository: Repository<User>,
   @InjectRepository(Profile)
   private profileRepository: Repository<Profile>,
   @InjectRepository(Role)
   private roleRepository: Repository<Role>

  ){}
  async findUserByProfle(filter: ProfileFilter) {
  
    const QueryBuilder = this.profileRepository.createQueryBuilder('profile').leftJoinAndSelect('profile.user', 'user')
    
    if(filter.frstName){
      QueryBuilder.where('profile.frstName LIKE :frstName',{frstName: `%${filter.frstName}%`});
    }
    if(filter.phone){
      QueryBuilder.andWhere('profile.phone LIKE :phone',{phone:`%${filter.phone}%`});
    }
    
    if(filter.email){
      QueryBuilder.andWhere('profile.email LIKE :email',{email:`%${filter.email}%`});
    }
    console.log(QueryBuilder.getMany())
    return QueryBuilder.getMany();
  }

 async update(roleID:number, userID:number) {
    const role = await this.roleRepository.findOne({where:{id:roleID}});
    const user = await this.userRepository.findOne({where:{id:userID}});
    if(user.roleID.id == 1){
      throw new ForbiddenException("U cant delete user with admin Role")
    }
    const result = await this.userRepository.update(userID,{roleID:role})
    if(result){
      return("User has been updated")
    }
    
  }

  async remove(id: number){
    const User = await this.userRepository.findOne({where:{id}})
    const admin = await this.roleRepository.findOne({where:{id:1}})
    if(User.roleID.id == admin.id){
      throw new ConflictException("U cant delete User with role ADMIN")
    }
    await this.userRepository.delete(User)
    return {message:"User hase been deleted"};
  }
  
}
export interface ProfileFilter {
  frstName?: string;
  phone?: string;
  email?: string;
}
