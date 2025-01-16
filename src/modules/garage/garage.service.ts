import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from 'src/db/entities/authentication.entity';
import { Garage } from 'src/db/entities/garage.entity';
import { Repository } from 'typeorm';
import { UsersService } from '../users/users.service';
@Injectable()
export class GarageService {
  constructor(
    @InjectRepository(Garage)
    private garageRepository: Repository<Garage>,
  ) {}
  async findOneByGarageID(id: number) {
    return await this.garageRepository.findOne({
      where: { id: id },
    });
  }
  async findGarageByOwnerID(ownerId: number): Promise<Garage[]> {
    return await this.garageRepository.find({
      where: {
        owner: { id: ownerId }, // Указываем вложенный объект с полем id
      },
      relations: ['owner', 'status', 'equipment'], // Убедитесь, что все связи определены в сущностях
    });
  }
}
