import { Module } from '@nestjs/common';
import { AdvertService } from './advert.service';
import { AdvertController } from './advert.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Garage } from 'src/db/entities/garage.entity';
import { User } from 'src/db/entities/authentication.entity';
import { Status } from 'src/db/entities/status.entity';
import { Equipment } from 'src/db/entities/equipment.entity';
import { GarageService } from '../garage/garage.service';
import { UsersService } from '../users/users.service';
import { APP_GUARD } from '@nestjs/core';
import { ThrottlerGuard } from '@nestjs/throttler';
@Module({
  controllers: [AdvertController],
  providers: [GarageService,AdvertService, UsersService,{
    provide: APP_GUARD,
    useClass: ThrottlerGuard
  }],
  imports: [TypeOrmModule.forFeature([Garage,User,Status, Equipment])],
})
export class AdvertModule {}
