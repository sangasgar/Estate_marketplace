import {
  BelongsTo,
  BelongsToMany,
  Column,
  ForeignKey,
  HasMany,
  Model,
  Table,
} from 'sequelize-typescript';
import { Leads } from 'src/modules/lead/model/lead.model';
import { Product } from 'src/modules/product/model/product.model';
import { Users } from 'src/modules/user/models/user.model';
import { Page } from '../../page/model/page.model';
@Table
export class Company extends Model {
  @Column
  company_name: string;
  @Column
  id_number: string;
  @ForeignKey(() => Page)
  page_id: Page;
  @BelongsTo(() => Page)
  page: Page;
  @Column
  company_phone: string;
  @Column
  company_address: string;
  @BelongsToMany(() => Users, 'Company_Users', 'company_id', 'user_id')
  users: Users[];
  @HasMany(() => Leads, {
    onDelete: 'SET NULL',
    onUpdate: 'SET NULL',
  })
  leads: Leads[];
}
@Table
export class Company_Users extends Model {}
