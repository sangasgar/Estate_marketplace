import { Module } from '@nestjs/common';
import { SequelizeModule } from '@nestjs/sequelize';
import { SeederModule } from 'nestjs-sequelize-seeder';
import { Product_Type } from './model/product_type.model';
import { ProductTypeController } from './product_type.controller';
import { ProductTypeService } from './product_type.service';
import { SeedProductType } from './seeds';

@Module({
  imports: [
    SequelizeModule.forFeature([Product_Type]),
    SeederModule.forFeature([SeedProductType]),
  ],
  controllers: [ProductTypeController],
  providers: [ProductTypeService],
})
export class ProductTypeModule {}
