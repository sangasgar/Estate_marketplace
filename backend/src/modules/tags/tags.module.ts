import { Module } from '@nestjs/common';
import { SequelizeModule } from '@nestjs/sequelize';
import { SeederModule } from 'nestjs-sequelize-seeder';
import { Tags } from './model/tags.model';
import { SeedTag } from './seeds';
import { TagsController } from './tags.controller';
import { TagsService } from './tags.service';

@Module({
  imports: [
    SequelizeModule.forFeature([Tags]),
    SeederModule.forFeature([SeedTag]),
  ],
  controllers: [TagsController],
  providers: [TagsService],
})
export class TagsModule {}
