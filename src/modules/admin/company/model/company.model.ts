import { Column, ForeignKey, Model, Table } from 'sequelize-typescript';
import { Users } from 'src/modules/user/models/user.model';
@Table
export class Company extends Model {
  @Column
  company_name: string;
  @Column
  id_number: string;
  @Column
  page_id: number;
  @Column
  company_phone: string;
  @Column
  company_address: string;
  @ForeignKey(() => Users)
  user_id: Users;
}
