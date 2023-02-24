import {
  BelongsTo,
  BelongsToMany,
  Column,
  DataType,
  ForeignKey,
  Model,
  Table,
} from 'sequelize-typescript';
import { Media_type } from 'src/modules/media_type/model/media_type.model';
import { Category } from 'src/modules/category/model/category.model';
import { Users } from 'src/modules/user/models/user.model';
import { Wishlist } from 'src/modules/wishlist/model/wishlist.model';

@Table
export class Product extends Model {
  @Column
  product_name: string;
  @Column
  product_title: string;
  @Column
  product_frontend_id: string;
  @Column
  product_short_description: string;
  @Column
  product_description: string;
  @Column
  product_is_visible: boolean;
  @Column
  product_sku_developer: string;
  @Column({ type: DataType.DOUBLE })
  product_price: number;
  @Column({ type: DataType.DOUBLE })
  product_old_price: number;
  @Column({ type: DataType.DOUBLE })
  product_purchase_price: number;
  @Column
  product_discount_percent: number;
  @Column({ type: DataType.DOUBLE })
  product_discount_price: number;
  @Column
  product_quantity: number;
  @ForeignKey(() => Category)
  product_category_id: Category;
  @BelongsTo(() => Category)
  product_category: Category;
  @BelongsToMany(
    () => Media_type,
    'Products_Media_Types',
    'product_id',
    'media_type_id',
  )
  product_media_type: Media_type[];
  @Column
  slug: string;
  @Column
  product_description_meta: string;
  @Column
  product_description_short_seo: string;
  @Column
  product_description_seo: string;
  @Column
  product_keywords: string;
  @ForeignKey(() => Users)
  user_id: Users;
  @BelongsTo(() => Users, 'user_id')
  user: Users;
  @BelongsToMany(
    () => Wishlist,
    'Products_Wishlists',
    'product_id',
    'wishlists_id',
  )
  wishlists: Wishlist[];
}

@Table
export class Products_Media_Types extends Model {
  @Column
  product_media_url: string;
}
@Table
export class Products_Wishlists extends Model {}
