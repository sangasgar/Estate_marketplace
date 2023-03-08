import {
  BelongsTo,
  BelongsToMany,
  Column,
  ForeignKey,
  Model,
  Table,
} from 'sequelize-typescript';
import { Product } from 'src/modules/product/model/product.model';
import { Users } from 'src/modules/user/models/user.model';

@Table
export class Wishlist extends Model {
  @Column
  wishlist_name: string;
  @ForeignKey(() => Users)
  user_id: Users;
  @BelongsTo(() => Users, 'user_id')
  users: Users;
  @BelongsToMany(
    () => Product,
    'Products_Wishlists',
    'wishlists_id',
    'product_id',
  )
  products: Product[];
}
