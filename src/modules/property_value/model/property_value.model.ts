import {
  BelongsTo,
  Column,
  ForeignKey,
  Model,
  Table,
} from 'sequelize-typescript';
import { Property_Name } from 'src/modules/property_name/model/property_name.model';

@Table
export class Property_Value extends Model {
  @Column
  properties_value_name: string;
  @Column
  slug: string;
  @ForeignKey(() => Property_Name)
  product_name_id: Property_Name;
  @BelongsTo(() => Property_Name, 'product_name_id')
  product_name: Property_Name;
}
