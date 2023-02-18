import {
  BelongsTo,
  Column,
  ForeignKey,
  HasMany,
  HasOne,
  Model,
  Table,
} from 'sequelize-typescript';
import { Company } from 'src/modules/admin/company/model/company.model';
import { Person } from 'src/modules/admin/person/model/person.model';
import { RoleModel } from 'src/modules/admin/role/model/role.model';
import { Watchlist } from 'src/modules/watchlist/models/watchlist.model';

@Table
export class Users extends Model {
  @Column
  email: string;
  @Column
  password: string;
  @ForeignKey(() => RoleModel)
  role_id: RoleModel;
  @HasMany(() => Company, {
    onDelete: 'SET NULL',
    onUpdate: 'SET NULL',
  })
  company_id: Company;
  @HasOne(() => Person, {
    onDelete: 'CASCADE',
    onUpdate: 'CASCADE',
  })
  person_id: Person;
  @Column
  product_id: string;
  @HasMany(() => Watchlist, {
    onDelete: 'CASCADE',
    onUpdate: 'CASCADE',
  })
  watchlist: Watchlist[];
}
