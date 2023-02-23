import { Module } from '@nestjs/common';
import { SequelizeModule } from '@nestjs/sequelize';
import { SeederModule } from 'nestjs-sequelize-seeder';
import { RoleModel } from './model/role.model';
import { RoleController } from './role.controller';
import { RoleService } from './role.service';
import { SeedRole } from './seeds';

@Module({
  imports: [
    SequelizeModule.forFeature([RoleModel]),
    SeederModule.forFeature([SeedRole]),
  ],
  controllers: [RoleController],
  providers: [RoleService],
})
export class RoleModule {}
