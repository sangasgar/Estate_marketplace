import {
  Column,
  ForeignKey,
  HasMany,
  Model,
  Table,
} from 'sequelize-typescript';

@Table
export class Category extends Model {
  @ForeignKey(() => Category)
  parent_category_id: number;
  @HasMany(() => Category)
  category: Category[];
  @Column
  category_name: string;
  @Column
  category_image: string;
  @Column
  slug: string;
}
