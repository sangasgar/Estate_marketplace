import {
  BelongsTo,
  Column,
  ForeignKey,
  HasMany,
  Model,
  Table,
} from 'sequelize-typescript';
import { Product_Type } from 'src/modules/product_type/model/product_type.model';
import { Property_Value } from 'src/modules/property_value/model/property_value.model';

@Table
export class Property_Name extends Model {
  @Column
  properties_name: string;
  @Column
  properties_icon: string;
  @Column
  slug: string;
  @ForeignKey(() => Product_Type)
  product_type_id: Product_Type;
  @BelongsTo(() => Product_Type, 'product_type_id')
  product_type: Product_Type;

  @HasMany(() => Property_Value, {
    onDelete: 'SET NULL',
    onUpdate: 'SET NULL',
  })
  property_value: Property_Value[];
}
