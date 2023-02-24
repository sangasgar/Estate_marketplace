import { Module } from '@nestjs/common';
import { SequelizeModule } from '@nestjs/sequelize';
import { MediaTypeController } from './media_type.controller';
import { MediaTypeService } from './media_type.service';
import { Media_type } from './model/media_type.model';

@Module({
  imports: [SequelizeModule.forFeature([Media_type])],
  controllers: [MediaTypeController],
  providers: [MediaTypeService],
})
export class MediaTypeModule {}
