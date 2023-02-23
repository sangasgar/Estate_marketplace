import {
  Column,
  ForeignKey,
  HasMany,
  Model,
  Table,
} from 'sequelize-typescript';
import { Page } from 'src/modules/page/model/page.model';

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
  page_slug: string;
}
