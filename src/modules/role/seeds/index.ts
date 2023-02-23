import { Seeder, OnSeederInit } from 'nestjs-sequelize-seeder';
import { RoleModel } from '../model/role.model';

@Seeder({
  model: RoleModel,
  unique: ['name'],
})
export class SeedRole implements OnSeederInit {
  run() {
    const data = [
      {
        name: 'Admin',
      },
      {
        name: 'Manager',
      },
      {
        name: 'Authorized',
      },
    ];
    return data;
  }
}
