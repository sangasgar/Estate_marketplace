import { Module } from '@nestjs/common';
import { PageService } from './page.service';
import { PageController } from './page.controller';
import { SequelizeModule } from '@nestjs/sequelize';
import { Page } from './model/page.model';

@Module({
  imports: [SequelizeModule.forFeature([Page])],
  providers: [PageService],
  controllers: [PageController],
})
export class PageModule {}
