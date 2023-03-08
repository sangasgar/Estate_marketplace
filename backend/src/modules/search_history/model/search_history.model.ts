import { Column, ForeignKey, Model, Table } from 'sequelize-typescript';
import { Users } from 'src/modules/user/models/user.model';

@Table
export class Search_History extends Model {
  @Column
  search_history_text: string;
  @ForeignKey(() => Users)
  user_id: Users;
}
