import { Module } from '@nestjs/common';
import { SequelizeModule } from '@nestjs/sequelize';
import { SeederModule } from 'nestjs-sequelize-seeder';
import { MediaTypeController } from './media_type.controller';
import { MediaTypeService } from './media_type.service';
import { Media_type } from './model/media_type.model';
import { MediaTypeSeeds } from './seeds';

@Module({
  imports: [
    SequelizeModule.forFeature([Media_type]),
    SeederModule.forFeature([MediaTypeSeeds]),
  ],
  controllers: [MediaTypeController],
  providers: [MediaTypeService],
})
export class MediaTypeModule {}
