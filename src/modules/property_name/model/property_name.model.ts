import {
  BelongsTo,
  Column,
  ForeignKey,
  HasMany,
  Model,
  Table,
} from 'sequelize-typescript';
import { Property_Value } from 'src/modules/property_value/model/property_value.model';

@Table
export class Property_Name extends Model {
  @Column
  properties_name: string;
  @Column
  properties_icon: string;
  @Column
  slug: string;
  @HasMany(() => Property_Value, {
    onDelete: 'SET NULL',
    onUpdate: 'SET NULL',
  })
  property_value: Property_Value[];
}
