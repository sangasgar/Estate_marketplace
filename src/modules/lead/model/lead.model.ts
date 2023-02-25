import {
  BelongsTo,
  BelongsToMany,
  Column,
  ForeignKey,
  Model,
  Table,
} from 'sequelize-typescript';
import { Company } from 'src/modules/company/model/company.model';
import { Lead_Status } from 'src/modules/lead_status/model/lead_status.model';
import { Product } from 'src/modules/product/model/product.model';

@Table
export class Lead_Type extends Model {
  @Column
  lead_type_name: string;
  @Column
  price: number;
  @BelongsToMany(() => Product, 'Leads', 'lead_id', 'product_id')
  product: Product[];
}
@Table
export class Leads extends Model {
  @Column
  name: string;
  @Column
  phone: string;
  @Column
  email: string;
  @Column
  comment: string;
  @ForeignKey(() => Company)
  company_id: Company;
  @BelongsTo(() => Company, 'company_id')
  company: Company;
  @ForeignKey(() => Lead_Status)
  lead_status_id: Lead_Status;
  @BelongsTo(() => Lead_Status, 'lead_status_id')
  lead_status: Lead_Status;
}
