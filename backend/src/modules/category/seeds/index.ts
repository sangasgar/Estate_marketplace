import { Seeder, OnSeederInit } from 'nestjs-sequelize-seeder';
import { Category } from '../model/category.model';

@Seeder({
  model: Category,
  unique: ['category_name'],
})
export class CategorySeeds implements OnSeederInit {
  run() {
    const data = [
      {
        category_name: 'Недвижимость',
        slug: 'property',
        parent_category_id: null,
      },
      {
        category_name: 'Апартаменты',
        slug: 'apatrment',
        parent_category_id: 1,
      },
    ];
    return data;
  }
}
