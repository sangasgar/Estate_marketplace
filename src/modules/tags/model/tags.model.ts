import { BelongsToMany, Column, Model, Table } from 'sequelize-typescript';
import { Product } from 'src/modules/product/model/product.model';

@Table
export class Tags extends Model {
  @Column
  tag_name: string;
  @Column
  slug: string;
  @BelongsToMany(() => Product, 'Product_Tags', 'tag_id', 'product_id')
  product: Product[];
}
