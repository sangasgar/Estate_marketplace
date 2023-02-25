import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { Tags } from './model/tags.model';

@Injectable()
export class TagsService {
  constructor(@InjectModel(Tags) private readonly tagRepository: Tags) {}
}
