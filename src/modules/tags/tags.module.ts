import { Module } from '@nestjs/common';
import { SequelizeModule } from '@nestjs/sequelize';
import { Tags } from './model/tags.model';
import { TagsController } from './tags.controller';
import { TagsService } from './tags.service';

@Module({
  imports: [SequelizeModule.forFeature([Tags])],
  controllers: [TagsController],
  providers: [TagsService],
})
export class TagsModule {}
