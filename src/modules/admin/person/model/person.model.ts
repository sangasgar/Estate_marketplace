import { Column, ForeignKey, HasOne, Model, Table } from 'sequelize-typescript';
import { Users } from 'src/modules/user/models/user.model';
import { Company } from '../../company/model/company.model';

@Table
export class Person extends Model {
  @Column
  firstname: string;
  @Column
  lastname: string;
  @Column
  phone: string;
  @Column
  person_address: string;
  @ForeignKey(() => Company)
  company_id: Company;
  @HasOne(() => Users, {
    onDelete: 'SET NULL',
    onUpdate: 'SET NULL',
  })
  user_id: Users;
}
