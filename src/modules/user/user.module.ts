import { Module } from '@nestjs/common';
import { UserService } from './user.service';
import { UserController } from './user.controller';
import { SequelizeModule } from '@nestjs/sequelize';
import { Users } from './models/user.model';
import { PersonModule } from '../person/person.module';
import { SeederModule } from 'nestjs-sequelize-seeder';
import { SeedUsers } from './seeds';
@Module({
  imports: [
    PersonModule,
    SequelizeModule.forFeature([Users]),
    SeederModule.forFeature([SeedUsers]),
  ],
  providers: [UserService],
  controllers: [UserController],
  exports: [UserService],
})
export class UserModule {}
