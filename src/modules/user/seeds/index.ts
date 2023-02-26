import { Seeder, OnSeederInit } from 'nestjs-sequelize-seeder';
import { Users } from '../models/user.model';
import * as bcrypt from 'bcrypt';

//$2b$10$jnzyrdJJeII5z/kTLQaW1uHbfQxj6/kwNgpjkZiRhjsdli7wNG/qK
@Seeder({
  model: Users,
  unique: ['email'],
})
export class SeedUsers implements OnSeederInit {
  run() {
    const data = [
      {
        email: 'sangas@yandex.ru',
        password:
          '$2b$10$jnzyrdJJeII5z/kTLQaW1uHbfQxj6/kwNgpjkZiRhjsdli7wNG/qK',
        role_id: 1,
      },
    ];
    return data;
  }
}
