import { Module } from '@nestjs/common';
import { ProfileService } from './profile.service';
import { ProfileController } from './profile.controller';
import { User } from 'src/db/entities/authentication.entity';
import { Profile } from 'src/db/entities/profile.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UsersService } from '../users/users.service';
import { JwtModule } from '@nestjs/jwt';
import { jwtConstants } from '../auth/constants';


@Module({
  controllers: [ProfileController],
  providers: [ProfileService, UsersService],
  imports: [TypeOrmModule.forFeature([User, Profile]), JwtModule.register({secret: jwtConstants.secret})]
})
export class ProfileModule {}
