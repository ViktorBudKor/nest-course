import { Module } from '@nestjs/common';
import { GarageService } from './garage.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Garage } from 'src/db/entities/garage.entity';
import { Profile } from 'src/db/entities/authentication.entity';
import { UsersModule } from '../users/users.module';


@Module({
  providers: [GarageService],
  imports: [
    TypeOrmModule.forFeature([Garage, Profile]),
    UsersModule,
  ],
  exports: [GarageService],
})
export class GarageModule {}
