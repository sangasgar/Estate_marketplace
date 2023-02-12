import {
  BelongsTo,
  Column,
  ForeignKey,
  HasOne,
  Model,
  Table,
} from 'sequelize-typescript';
import { Users } from 'src/modules/user/models/user.model';

@Table
export class Watchlist extends Model {
  @ForeignKey(() => Users)
  user_id: Users;
  @Column
  name: string;
  @Column
  assetId: string;
}
