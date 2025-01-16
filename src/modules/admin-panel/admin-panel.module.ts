import { Module } from '@nestjs/common';
import { AdminPanelService } from './admin-panel.service';
import { AdminPanelController } from './admin-panel.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from 'src/db/entities/authentication.entity';
import { Profile } from 'src/db/entities/profile.entity';
import { Role } from 'src/db/entities/roles.entity';
import { UsersService } from '../users/users.service';

@Module({
  controllers: [AdminPanelController],
  providers: [AdminPanelService, UsersService],
  imports: [TypeOrmModule.forFeature([User, Profile,Role])]
})
export class AdminPanelModule {}
