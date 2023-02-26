import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { MediaTypeDTO, MediaTypeUpdateDTO } from './dto';
import { Media_type } from './model/media_type.model';
import { MediaTypeResponse, StatusMediaTypeResponse } from './response';

@Injectable()
export class MediaTypeService {
  constructor(
    @InjectModel(Media_type)
    private readonly mediaTypeRepository: typeof Media_type,
  ) {}
  async findMediaType(field) {
    try {
      const mediaType = this.mediaTypeRepository.findOne({ where: field });
      return mediaType;
    } catch (error) {
      throw new Error(error);
    }
  }
  async createMediaType(
    mediaTypeDTO: MediaTypeDTO,
  ): Promise<MediaTypeResponse> {
    try {
      const mediaType = await this.mediaTypeRepository.create({
        ...mediaTypeDTO,
      });
      return mediaType;
    } catch (error) {
      throw new Error(error);
    }
  }
  async updateMediaType(
    mediaTypeDTO: MediaTypeUpdateDTO,
  ): Promise<MediaTypeResponse> {
    try {
      await this.mediaTypeRepository.update(
        {
          ...mediaTypeDTO,
        },
        { where: { id: mediaTypeDTO.id } },
      );
      const findMedia = await this.findMediaType({ id: mediaTypeDTO.id });
      return findMedia;
    } catch (error) {
      throw new Error(error);
    }
  }
  async deleteMediaType(
    mediaTypeDTO: MediaTypeUpdateDTO,
  ): Promise<StatusMediaTypeResponse> {
    try {
      this.mediaTypeRepository.destroy({ where: { id: mediaTypeDTO.id } });

      return { status: true };
    } catch (error) {
      throw new Error(error);
    }
  }
  async getMediaTypes(): Promise<MediaTypeResponse[]> {
    try {
      const mediaTypes = await this.mediaTypeRepository.findAll();
      return mediaTypes;
    } catch (error) {
      throw new Error(error);
    }
  }
}
