import { Column, HasMany, Model, Table } from 'sequelize-typescript';
import { Users } from 'src/modules/user/models/user.model';

@Table
export class RoleModel extends Model {
  @Column
  name: string;
  @HasMany(() => Users, {
    onDelete: 'SET NULL',
    onUpdate: 'SET NULL',
  })
  user: Users[];
}
