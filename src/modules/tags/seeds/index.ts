import { Seeder, OnSeederInit } from 'nestjs-sequelize-seeder';
import { Tags } from '../model/tags.model';

@Seeder({
  model: Tags,
  unique: ['tag_name'],
})
export class SeedTag implements OnSeederInit {
  run() {
    const data = [
      {
        tag_name: 'Интернет',
        slug: 'network',
      },
      {
        tag_name: 'Бассейн',
        parent_menu_id: 'pool',
      },
    ];
    return data;
  }
}
