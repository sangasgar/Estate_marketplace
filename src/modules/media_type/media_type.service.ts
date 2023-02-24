import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { Media_type } from './model/media_type.model';

@Injectable()
export class MediaTypeService {
  constructor(
    @InjectModel(Media_type)
    private readonly mediaTypeRepository: typeof Media_type,
  ) {}
}
