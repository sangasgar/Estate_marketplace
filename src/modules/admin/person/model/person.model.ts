import { Column, ForeignKey, HasOne, Model, Table } from 'sequelize-typescript';
import { Users } from 'src/modules/user/models/user.model';

@Table
export class Person extends Model {
  @Column
  first_name: string;
  @Column
  last_name: string;
  @Column
  middle_name: string;
  @Column
  phone: string;
  @Column
  person_address: string;
  @ForeignKey(() => Users)
  user_id: Users;
}
