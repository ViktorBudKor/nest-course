import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthenticationModule } from './modules/authentication/authentication.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Profile } from './db/entities/authentication.entity';
import { BlogsModule } from './modules/blogs/blogs.module';
import { SeedModule } from './seed/seed.module';
import { Blog } from './db/entities/blog.entity';
import { CategoryBlog } from './db/entities/categoryBlog.entity';
import { AuthModule } from './modules/auth/auth.module';
import { UsersModule } from './modules/users/users.module';
import { AuthController } from './modules/auth/auth.controller';
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
    AuthenticationModule,
    BlogsModule,
    SeedModule,
    AuthModule,
    UsersModule,
  ],
})
export class AppModule {}
