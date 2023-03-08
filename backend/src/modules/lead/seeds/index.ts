import { Seeder, OnSeederInit } from 'nestjs-sequelize-seeder';
import { Lead_Type } from '../model/lead.model';

@Seeder({
  model: Lead_Type,
  unique: ['lead_type_name'],
})
export class LeadTypeSeeds implements OnSeederInit {
  run() {
    const data = [
      {
        lead_type_name: 'Классическая',
        price: 0,
      },
    ];
    return data;
  }
}
