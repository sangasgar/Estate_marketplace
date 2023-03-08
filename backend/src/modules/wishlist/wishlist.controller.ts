import { Controller } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { Wishlist } from './model/wishlist.model';

@Controller('wishlist')
export class WishlistController {
  constructor(
    @InjectModel(Wishlist) private readonly wishlistRepository: typeof Wishlist,
  ) {}
}
