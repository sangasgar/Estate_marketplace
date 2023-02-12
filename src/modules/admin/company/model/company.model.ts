import { Column, HasMany, Model, Table } from 'sequelize-typescript';
import { Person } from '../../person/model/person.model';
@Table
export class Company extends Model {
  @Column
  company_name: string;
  @Column
  id_number: string;
  @Column
  page_id: number;
  @Column
  company_phone: string;
  @Column
  company_address: string;
  @HasMany(() => Person, {
    onDelete: 'SET NULL',
    onUpdate: 'SET NULL',
  })
  person: Person[];
}
