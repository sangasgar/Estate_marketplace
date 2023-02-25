import { Module } from '@nestjs/common';
import { SequelizeModule } from '@nestjs/sequelize';
import { SeederModule } from 'nestjs-sequelize-seeder';
import { MenuController } from './menu.controller';
import { MenuService } from './menu.service';
import { Menu } from './model/menu.model';
import { SeedMenu } from './seeds';

@Module({
  imports: [
    SequelizeModule.forFeature([Menu]),
    SeederModule.forFeature([SeedMenu]),
  ],
  controllers: [MenuController],
  providers: [MenuService],
})
export class MenuModule {}
