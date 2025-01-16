import { Injectable, NotAcceptableException, NotFoundException } from '@nestjs/common';
import { CreateAdvertDto } from './dto/create-advert.dto';
import { Garage } from 'src/db/entities/garage.entity';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from 'src/db/entities/authentication.entity';
import { GarageService } from '../garage/garage.service';
import { Status } from 'src/db/entities/status.entity';
import { Equipment } from 'src/db/entities/equipment.entity';
import { In } from 'typeorm';
import { UsersService } from '../users/users.service';
@Injectable()
export class AdvertService {
  constructor(
    private garageService: GarageService,
    private usersService: UsersService,
    @InjectRepository(Garage)
    private garageRepository: Repository<Garage>,
    @InjectRepository(Status)
    private StatusRepository: Repository<Status>,
    @InjectRepository(Equipment)
    private EquipmentRepository: Repository<Equipment>,
  ) {}
  async create(createAdvertDto: CreateAdvertDto, user:any) {
    const finduser = await this.usersService.findOne(user.username);
    const {street, numberOfSpaces, price, equipment} = createAdvertDto;
    const status = await this.StatusRepository.findOne({where:{id:1}});
    const eq = await this.EquipmentRepository.find({where:{id: In(equipment)}});
    const garage = await this.garageRepository.create({owner:finduser, street:street, numberOfSpaces:numberOfSpaces, price:price, isPublished:false, status:status, equipment:eq });
    console.log(garage);
    const newgarage = await this.garageRepository.save(garage);
    return newgarage;

  }

  async findPublishedAd() {
    const garages = await this.garageRepository.find({where:{isPublished:true}})
    return garages
  }

  async findAdByUserId(userId:number) {
    const garages = this.garageService.findGarageByOwnerID(userId)
    return garages;

  }
  async findAll(){
    const garages = this.garageRepository.find()
    return garages;
  }

  async updateStatus(body:any) {
    const id = body.id;
    const status = body.status;
    const garage = await this.garageService.findOneByGarageID(id)
    const newStatus = await this.StatusRepository.findOne({where:{id:status}})
    
      const updateResult = await this.garageRepository.update(id, {status:newStatus});

    // Проверяем, была ли запись обновлена
    if (updateResult.affected === 0) {
      throw new NotFoundException('Garage not found or nothing to update');
    }
    return await this.garageRepository.findOne({ where: { id } });
  }
  async updatePublished(body,user:any){
    const garageID = body.id
    const garage = await this.garageService.findOneByGarageID(garageID)
    if(user.roles.id === 1 || user.sub === garage.owner.id){
      const updateResult = await this.garageRepository.update(garageID, {isPublished:!(garage.isPublished)});
      if (updateResult.affected === 0) {
        throw new NotFoundException('Garage not found or nothing to update');
      }
      return await this.garageRepository.findOne({ where: { id:garageID } });
    }
    throw new NotAcceptableException('You cant change this advert ')

    }
    async findChecking(){
      const status = await this.StatusRepository.findOne({where:{id:1}})
      const garages = await this.garageRepository.find({where:{status}})
      return garages
    }
    
    
}
// async create(createAuthenticationDto: CreateAuthenticationDto) {
//   const { username, password, confirmPassword } = createAuthenticationDto;

//   if (confirmPassword === password) {
//     const roleID = 2;
//     const userRole = await this.roleRepository.findOne({
//       where: { id: roleID },
//     });
//     const newProfile = this.ProfileRepository.create({
//       username: username,
//       password: password,
//       roleID: userRole,
//     });
//     const existingProfile = await this.ProfileRepository.findOne({
//       where: { username },
//     });
//     if (existingProfile) {
//       return 'Пользователь с таким именем существует';
//     }
//     const savedProfile = await this.ProfileRepository.save(newProfile);
//     const payload = {
//       username: savedProfile.username,
//       sub: savedProfile.id,
//       role: savedProfile.roleID,
//     };
//     return { savedProfile, access_token: this.jwtService.sign(payload) };
//   } else return 'Неверный пароль';
// }
