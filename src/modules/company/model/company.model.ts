import {
  BelongsTo,
  BelongsToMany,
  Column,
  ForeignKey,
  Model,
  Table,
} from 'sequelize-typescript';
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
}
@Table
export class Company_Users extends Model {}
