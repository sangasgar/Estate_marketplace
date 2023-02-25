import { Column, HasMany, Model, Table } from 'sequelize-typescript';
import { Leads } from 'src/modules/lead/model/lead.model';

@Table
export class Lead_Status extends Model {
  @Column
  lead_status: string;
  @HasMany(() => Leads, {
    onDelete: 'SET NULL',
    onUpdate: 'SET NULL',
  })
  leads: Leads[];
}
