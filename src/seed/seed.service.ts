import { Injectable, OnApplicationBootstrap } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CategoryBlog } from 'src/db/entities/categoryBlog.entity';
import { Role } from 'src/db/entities/roles.entity';

@Injectable()
export class SeedService implements OnApplicationBootstrap {
  constructor(
    @InjectRepository(Role)
    private roleRepository: Repository<Role>,
    @InjectRepository(CategoryBlog)
    private categoryBlogRepository: Repository<CategoryBlog>,
  ) {}

  // Метод для автоматического запуска сидов при старте приложения
  async onApplicationBootstrap() {
    await this.runSeed(); // Автоматический запуск сидов
  }

  // Метод для выполнения сидов
  async runSeed() {
    const categories = [
      this.categoryBlogRepository.create({ id: 1, name: 'Technology' }),
      this.categoryBlogRepository.create({ id: 2, name: 'Lifestyle' }),
      this.categoryBlogRepository.create({ id: 3, name: 'Education' }),
      this.categoryBlogRepository.create({ id: 4, name: 'Music' }),
      this.categoryBlogRepository.create({ id: 5, name: 'Scientific' }),
      this.categoryBlogRepository.create({ id: 6, name: 'Entertainment' }),
    ];
    const roles = [
      this.roleRepository.create({ id: 1, name: 'Admin' }),
      this.roleRepository.create({ id: 2, name: 'User' }),
    ];
    await this.categoryBlogRepository.save(categories);
    await this.roleRepository.save(roles);
  }
}
