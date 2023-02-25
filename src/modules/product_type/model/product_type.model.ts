import { Column, HasMany, Model, Table } from 'sequelize-typescript';
import { Product } from 'src/modules/product/model/product.model';
import { Property_Name } from 'src/modules/property_name/model/property_name.model';

@Table
export class Product_Type extends Model {
  @Column
  product_type_name: string;
  @Column
  slug: string;
  @HasMany(() => Product, {
    onDelete: 'SET NULL',
    onUpdate: 'SET NULL',
  })
  product: Product[];
  @HasMany(() => Property_Name, {
    onDelete: 'SET NULL',
    onUpdate: 'SET NULL',
  })
  property_name: Property_Name[];
}
