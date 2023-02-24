import { Module } from '@nestjs/common';
import { SequelizeModule } from '@nestjs/sequelize';
import { Wishlist } from './model/wishlist.model';
import { WishlistController } from './wishlist.controller';
import { WishlistService } from './wishlist.service';

@Module({
  imports: [SequelizeModule.forFeature([Wishlist])],
  providers: [WishlistService],
  controllers: [WishlistController],
})
export class WishlistModule {}
