import { Column, HasMany, Model, Table } from 'sequelize-typescript';
import { Watchlist } from 'src/modules/watchlist/models/watchlist.model';

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
  @HasMany(() => Watchlist, {
    onDelete: 'CASCADE',
    onUpdate: 'CASCADE',
  })
  watchlist: Watchlist[];
}
