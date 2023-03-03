import { Seeder, OnSeederInit } from 'nestjs-sequelize-seeder';
import { Property_Value } from '../model/property_value.model';

@Seeder({
  model: Property_Value,
  unique: ['properties_value_name'],
})
export class SeedPropertyValue implements OnSeederInit {
  run() {
    const data = [
      {
        properties_value_name: '2',
        slug: '2',
        properties_name_id: 1,
      },
      {
        properties_value_name: '4',
        slug: '4',
        properties_name_id: 1,
      },
    ];
    return data;
  }
}
