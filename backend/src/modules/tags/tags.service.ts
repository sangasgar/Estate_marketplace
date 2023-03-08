import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { TagDeleteDTO, TagDTO, TagUpdateDTO } from './dto';
import { Tags } from './model/tags.model';
import { TagResponse, TagUpdateResponse } from './response';
import { transliteration } from '../../config/translit';

@Injectable()
export class TagsService {
  constructor(@InjectModel(Tags) private readonly tagRepository: typeof Tags) {}
  async findTag(field): Promise<TagResponse> {
    try {
      const tags = await this.tagRepository.findOne({
        where: { ...field },
      });
      return tags;
    } catch (error) {
      throw new Error(error);
    }
  }

  async findTags(): Promise<TagResponse[]> {
    try {
      const tags = await this.tagRepository.findAll();
      return tags;
    } catch (error) {
      throw new Error(error);
    }
  }

  async createTag(tagDTO: TagDTO): Promise<TagResponse> {
    try {
      const slug = transliteration(tagDTO.tag_name);
      const tags = await this.tagRepository.create({ ...tagDTO, slug });
      return tags;
    } catch (error) {
      throw new Error(error);
    }
  }
  async updateTag(tagDTO: TagUpdateDTO): Promise<TagResponse> {
    try {
      const tags = await this.tagRepository.update(
        { ...tagDTO },
        { where: { id: tagDTO.id } },
      );
      const tagsFind = await this.findTag({ id: tagDTO.id });
      return tagsFind;
    } catch (error) {
      throw new Error(error);
    }
  }

  async deleteTag(id: TagDeleteDTO): Promise<TagUpdateResponse> {
    try {
      const tags = await this.tagRepository.destroy({
        where: { ...id },
      });
      if (tags) {
        return { status: true };
      }
      if (!tags) {
        return { status: false };
      }
    } catch (error) {
      throw new Error(error);
    }
  }
}
