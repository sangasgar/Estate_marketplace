import { Seeder, OnSeederInit } from 'nestjs-sequelize-seeder';
import { Company } from '../model/company.model';

@Seeder({
  model: Company,
  unique: ['id_number'],
})
export class CompanySeeds implements OnSeederInit {
  run() {
    const data = [
      {
        company_name: 'TBE',
        id_number: '20716007',
        company_phone: '+961562382064',
        company_address: 'Al Abraj St., Business Bay, The Metropolis',
      },
    ];
    return data;
  }
}
