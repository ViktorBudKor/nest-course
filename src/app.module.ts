import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { BlogsModule } from './modules/blogs/blogs.module';
import { SeedModule } from './seed/seed.module';
import { AuthModule } from './modules/auth/auth.module';
import { UsersModule } from './modules/users/users.module';
import { AdvertModule } from './modules/advert/advert.module';
import { GarageModule } from './modules/garage/garage.module';
import { ThrottlerGuard, ThrottlerModule } from '@nestjs/throttler';
import { APP_GUARD } from '@nestjs/core';
import { ProfileModule } from './modules/profile/profile.module';
import { AdminPanelModule } from './modules/admin-panel/admin-panel.module';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: 'localhost',
      port: 5432,
      username: 'postgres',
      password: '123456',
      database: 'nest-course',
      entities: ['./dist/db/entities/*.{ts,js}'],
      synchronize: true,
    }),
    BlogsModule,
    SeedModule,
    AuthModule,
    UsersModule,
    AdvertModule,
    GarageModule,
    ThrottlerModule.forRoot([{
      ttl: 60000,
      limit: 10,
    }]),
    ProfileModule,
    AdminPanelModule,
  ],
})
export class AppModule {}
