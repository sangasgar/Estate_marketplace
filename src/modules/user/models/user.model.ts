import {
  BelongsTo,
  BelongsToMany,
  Column,
  ForeignKey,
  HasMany,
  HasOne,
  Model,
  Table,
} from 'sequelize-typescript';
import { Company } from 'src/modules/company/model/company.model';
import { Person } from 'src/modules/person/model/person.model';
import { RoleModel } from 'src/modules/role/model/role.model';
import { Watchlist } from 'src/modules/watchlist/models/watchlist.model';

@Table
export class Users extends Model {
  @Column
  email: string;
  @Column
  password: string;
  @ForeignKey(() => RoleModel)
  role_id: RoleModel;
  @BelongsTo(() => RoleModel)
  role: RoleModel;
  @BelongsToMany(() => Company, 'Company_Users', 'user_id', 'company_id')
  company: Company[];
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
