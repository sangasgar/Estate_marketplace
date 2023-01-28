import { Column, Model, PrimaryKey, Table } from 'sequelize-typescript';

@Table
export class Users extends Model {
  @Column
  username: string;
  @Column
  email: string;
  @Column
  password: string;
  @Column
  phone: string;
}
