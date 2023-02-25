import { Module } from '@nestjs/common';
import { SequelizeModule } from '@nestjs/sequelize';
import {
  Product,
  Products_Media_Types,
  Products_Wishlists,
  Product_Tags,
  Viewed,
} from './model/product.model';
import { ProductController } from './product.controller';
import { ProductService } from './product.service';

@Module({
  imports: [
    SequelizeModule.forFeature([
      Product,
      Products_Media_Types,
      Products_Wishlists,
      Viewed,
      Product_Tags,
    ]),
  ],
  providers: [ProductService],
  controllers: [ProductController],
})
export class ProductModule {}
