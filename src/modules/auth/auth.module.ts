import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { UsersModule } from '../users/users.module';
import { PassportModule } from '@nestjs/passport';
import { LocalStrategy } from './strategies/local.strategy';
import { AuthController } from './auth.controller';
import { JwtModule } from '@nestjs/jwt';
import { jwtConstants } from './constants';
import { JwtStrategy } from './strategies/jwt.strategy';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from 'src/db/entities/authentication.entity';
import { Role } from 'src/db/entities/roles.entity';
import { APP_GUARD } from '@nestjs/core';
import { Profile } from 'src/db/entities/profile.entity';
// import { RolesGuard } from './guards/roles.guard';
// import { RoleAdminStrategy } from './strategies/role-admin.strategy';

@Module({
  providers: [
    AuthService,
    LocalStrategy,
    JwtStrategy,
    // {
    //   provide: APP_GUARD,
    //   useClass: RolesGuard,
    // },
  ],
  imports: [
    UsersModule,
    PassportModule,
    JwtModule.register({
      secret: jwtConstants.secret,
      signOptions: { expiresIn: '1d' },
    }),
    TypeOrmModule.forFeature([User , Role, Profile]),
  ],
  controllers: [AuthController],
  exports: [AuthService],
})
export class AuthModule {}
