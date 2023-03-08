import { Module } from '@nestjs/common';
import { SequelizeModule } from '@nestjs/sequelize';
import { SeederModule } from 'nestjs-sequelize-seeder';
import { Tags } from '../tags/model/tags.model';
import { TokenModule } from '../token/token.module';
import { Users } from '../user/models/user.model';
import {
  Product,
  Products_Media_Types,
  Products_Wishlists,
  Product_Tags,
  PropertyValue_Products,
  Viewed,
} from './model/product.model';
import { ProductController } from './product.controller';
import { ProductService } from './product.service';
import { ProductSeeds } from './seeds';

@Module({
  imports: [
    SequelizeModule.forFeature([
      Product,
      Products_Media_Types,
      Products_Wishlists,
      Viewed,
      Product_Tags,
      PropertyValue_Products,
      Tags,
      Users,
    ]),
    SeederModule.forFeature([ProductSeeds]),
    TokenModule,
  ],
  providers: [ProductService],
  controllers: [ProductController],
})
export class ProductModule {}
