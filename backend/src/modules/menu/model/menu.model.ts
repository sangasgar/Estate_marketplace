import {
  Column,
  ForeignKey,
  HasMany,
  Model,
  Table,
} from 'sequelize-typescript';

@Table
export class Menu extends Model {
  @Column
  @ForeignKey(() => Menu)
  parent_menu_id: number;
  @HasMany(() => Menu, {
    onDelete: 'CASCADE',
    onUpdate: 'CASCADE',
  })
  menu: Menu[];
  @Column
  menu_name: string;
  @Column
  menu_image: string;
  @Column
  menu_slug: string;
}
