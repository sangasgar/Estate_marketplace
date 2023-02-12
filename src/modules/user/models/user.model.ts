import {
  Column,
  ForeignKey,
  HasMany,
  Model,
  Table,
} from 'sequelize-typescript';
import { Person } from 'src/modules/admin/person/model/person.model';
import { Role } from 'src/modules/admin/role/model/role.model';
import { Watchlist } from 'src/modules/watchlist/models/watchlist.model';

@Table
export class Users extends Model {
  @Column
  username: string;
  @Column
  email: string;
  @Column
  password: string;
  @ForeignKey(() => Role)
  role_id: Role;
  @ForeignKey(() => Person)
  person_id: Person;
  @Column
  product_id: string;
  @HasMany(() => Watchlist, {
    onDelete: 'CASCADE',
    onUpdate: 'CASCADE',
  })
  watchlist: Watchlist[];
}
