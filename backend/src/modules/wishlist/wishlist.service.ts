import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { Wishlist } from './model/wishlist.model';

@Injectable()
export class WishlistService {
  constructor(
    @InjectModel(Wishlist) private readonly wishlistRepository: typeof Wishlist,
  ) {}
}
