import { Controller } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { Media_type } from './model/media_type.model';

@Controller('media-type')
export class MediaTypeController {
  constructor(
    @InjectModel(Media_type)
    private readonly mediaTypeRepository: typeof Media_type,
  ) {}
}
