import { Seeder, OnSeederInit } from 'nestjs-sequelize-seeder';
import { Property_Name } from '../model/property_name.model';

@Seeder({
  model: Property_Name,
  unique: ['properties_name'],
})
export class SeedPropertyName implements OnSeederInit {
  run() {
    const data = [
      {
        properties_name: 'Количество комнат',
        slug: 'kolisgestvo-komnat',
        product_type_id: 1,
      },
      {
        properties_name: 'Наличие ванны',
        slug: 'nalishie-vanni',
        product_type_id: 1,
      },
    ];
    return data;
  }
}
