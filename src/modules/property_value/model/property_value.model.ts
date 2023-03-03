import {
  BelongsTo,
  BelongsToMany,
  Column,
  ForeignKey,
  Model,
  Table,
} from 'sequelize-typescript';
import { Product } from 'src/modules/product/model/product.model';
import { Property_Name } from 'src/modules/property_name/model/property_name.model';

@Table
export class Property_Value extends Model {
  @Column
  properties_value_name: string;
  @Column
  slug: string;
  @ForeignKey(() => Property_Name)
  properties_name_id: Property_Name;
  @BelongsTo(() => Property_Name, 'properties_name_id')
  property_name: Property_Name;
  @BelongsToMany(
    () => Product,
    'PropertyValue_Products',
    'property_value_id',
    'product_id',
  )
  product: Product[];
}
