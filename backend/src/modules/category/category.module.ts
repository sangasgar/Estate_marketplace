import { Module } from '@nestjs/common';
import { CategoryService } from './category.service';
import { CategoryController } from './category.controller';
import { SequelizeModule } from '@nestjs/sequelize';
import { Category } from './model/category.model';
import { SeederModule } from 'nestjs-sequelize-seeder';
import { CategorySeeds } from './seeds';

@Module({
  imports: [
    SequelizeModule.forFeature([Category]),
    SeederModule.forFeature([CategorySeeds]),
  ],
  providers: [CategoryService],
  controllers: [CategoryController],
})
export class CategoryModule {}
