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
import { Product } from 'src/modules/product/model/product.model';
import { RoleModel } from 'src/modules/role/model/role.model';
import { Search_History } from 'src/modules/search_history/model/search_history.model';
import { Wishlist } from 'src/modules/wishlist/model/wishlist.model';

@Table
export class Users extends Model {
  @Column
  email: string;
  @Column
  email_is_verified: boolean;
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

  @HasMany(() => Search_History, {
    onDelete: 'SET NULL',
    onUpdate: 'SET NULL',
  })
  search_history: Search_History[];
  @HasMany(() => Wishlist, {
    onDelete: 'CASCADE',
    onUpdate: 'CASCADE',
  })
  wishlist: Wishlist[];
  @HasMany(() => Product, 'user_id')
  product: Product[];

  @BelongsToMany(() => Product, 'Viewed', 'user_id', 'product_id')
  product_viewed: Product[];
}
