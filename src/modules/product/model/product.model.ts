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
import { Tags } from 'src/modules/tags/model/tags.model';
import { Lead_Type } from 'src/modules/lead/model/lead.model';
import { Property_Value } from 'src/modules/property_value/model/property_value.model';

@Table
export class Product extends Model {
  @Column
  product_name: string;
  @Column
  product_title: string;
  @Column({ unique: true, allowNull: false })
  product_frontend_id: string;
  @Column
  product_short_description: string;
  @Column
  product_description: string;
  @Column
  product_sku_developer: string;
  @Column({ defaultValue: true })
  product_is_visible: boolean;
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
  @BelongsToMany(() => Users, 'Viewed', 'product_id', 'user_id')
  user_viewed: Users[];
  @BelongsToMany(() => Tags, 'Product_Tags', 'product_id', 'tag_id')
  tags: Tags[];
  @BelongsToMany(() => Lead_Type, 'Leads', 'product_id', 'lead_id')
  lead_type: Lead_Type[];
  @BelongsToMany(
    () => Property_Value,
    'PropertyValue_Products',
    'product_id',
    'property_value_id',
  )
  property_value: Property_Value[];
}

@Table
export class Products_Media_Types extends Model {
  @Column
  product_media_url: string;
}
@Table
export class Products_Wishlists extends Model {}
@Table
export class Viewed extends Model {}
@Table
export class Product_Tags extends Model {}
@Table
export class PropertyValue_Products extends Model {}
