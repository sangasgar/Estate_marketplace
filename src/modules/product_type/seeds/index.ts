import { Seeder, OnSeederInit } from 'nestjs-sequelize-seeder';
import { Product_Type } from '../model/product_type.model';

@Seeder({
  model: Product_Type,
  unique: ['product_type_name'],
})
export class SeedProductType implements OnSeederInit {
  run() {
    const data = [
      {
        product_type_name: 'Недвижимость',
        slug: 'property',
      },
      {
        product_type_name: 'Апартаменты',
        slug: 'apartment',
      },
    ];
    return data;
  }
}
