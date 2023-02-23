import { Module } from '@nestjs/common';
import { SequelizeModule } from '@nestjs/sequelize';
import { MenuController } from './menu.controller';
import { MenuService } from './menu.service';
import { Menu } from './model/menu.model';

@Module({
  imports: [SequelizeModule.forFeature([Menu])],
  controllers: [MenuController],
  providers: [MenuService],
})
export class MenuModule {}
