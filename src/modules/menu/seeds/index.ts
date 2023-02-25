import { Seeder, OnSeederInit } from 'nestjs-sequelize-seeder';
import { Menu } from '../model/menu.model';

@Seeder({
  model: Menu,
  unique: ['menu_name'],
})
export class SeedMenu implements OnSeederInit {
  run() {
    const data = [
      {
        menu_name: 'Главная',
        parent_menu_id: null,
      },
      {
        menu_name: 'Недвижимость',
        parent_menu_id: 1,
      },
      {
        menu_name: 'Апартаменты',
        parent_menu_id: 1,
      },
    ];
    return data;
  }
}
