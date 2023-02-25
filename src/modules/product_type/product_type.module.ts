import { Module } from '@nestjs/common';
import { SequelizeModule } from '@nestjs/sequelize';
import { Product_Type } from './model/product_type.model';
import { ProductTypeController } from './product_type.controller';
import { ProductTypeService } from './product_type.service';

@Module({
  imports: [SequelizeModule.forFeature([Product_Type])],
  controllers: [ProductTypeController],
  providers: [ProductTypeService],
})
export class ProductTypeModule {}
