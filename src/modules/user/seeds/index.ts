import { Seeder, OnSeederInit } from 'nestjs-sequelize-seeder';
import { Users } from '../models/user.model';
import * as bcrypt from 'bcrypt';
@Seeder({
  model: Users,
  unique: ['email'],
})
export class SeedUsers implements OnSeederInit {
  run() {
    const data = [
      {
        email: 'sangas@mail.ru',
        password: bcrypt.hash('123', 10),
        role_id: 1,
      },
    ];
    return data;
  }
}
