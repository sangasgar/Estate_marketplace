import { BelongsToMany, Column, Model, Table } from 'sequelize-typescript';
import { Product } from 'src/modules/product/model/product.model';

@Table
export class Media_type extends Model {
  @Column
  media_type_name: string;
  @Column
  media_type_extension: string;
  @BelongsToMany(
    () => Product,
    'Products_Media_Types',
    'media_type_id',
    'product_id',
  )
  media_type: Product[];
}
