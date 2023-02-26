import {
  Body,
  CacheInterceptor,
  CacheTTL,
  Controller,
  Delete,
  Get,
  HttpException,
  HttpStatus,
  Patch,
  Post,
  UseGuards,
  UseInterceptors,
} from '@nestjs/common';
import { ApiResponse, ApiTags } from '@nestjs/swagger';
import { AppError } from 'src/common/constant/error';
import { JwtAuthGuard } from '../auth/guards';
import { Role } from '../auth/guards/enums/role.enum';
import { RolesGuard } from '../auth/guards/role.guard';
import { HasRoles } from '../auth/guards/roles.decorator';
import { DeleteMediaTypeDTO, MediaTypeDTO, MediaTypeUpdateDTO } from './dto';
import { MediaTypeService } from './media_type.service';
import { Media_type } from './model/media_type.model';
import { MediaTypeResponse, StatusMediaTypeResponse } from './response';

@Controller('media-type')
export class MediaTypeController {
  constructor(private readonly mediaTypeService: MediaTypeService) {}
  @ApiTags('MediaTypeAPI')
  @ApiResponse({ status: 200, type: MediaTypeResponse })
  @HasRoles(Role.Manager, Role.Admin)
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Post()
  async createMediaType(
    @Body() mediaTypeDTO: MediaTypeDTO,
  ): Promise<MediaTypeResponse> {
    mediaTypeDTO.media_type_name =
      mediaTypeDTO.media_type_name[0].toUpperCase() +
      mediaTypeDTO.media_type_name.substring(1).toLowerCase();
    mediaTypeDTO.media_type_extension =
      mediaTypeDTO.media_type_extension.toLowerCase();
    const mediaType = await this.mediaTypeService.findMediaType({
      media_type_name: mediaTypeDTO.media_type_name,
    });
    if (mediaType)
      throw new HttpException(AppError.MEDIA_TYPE_FOUND, HttpStatus.FOUND);
    return await this.mediaTypeService.createMediaType(mediaTypeDTO);
  }
  @ApiTags('MediaTypeAPI')
  @ApiResponse({ status: 200, type: MediaTypeResponse })
  @HasRoles(Role.Manager, Role.Admin)
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Patch()
  async updateMediaType(
    @Body() mediaTypeDTO: MediaTypeUpdateDTO,
  ): Promise<MediaTypeResponse> {
    mediaTypeDTO.media_type_name =
      mediaTypeDTO.media_type_name[0].toUpperCase() +
      mediaTypeDTO.media_type_name.substring(1).toLowerCase();
    mediaTypeDTO.media_type_extension =
      mediaTypeDTO.media_type_extension.toLowerCase();
    const mediaType = await this.mediaTypeService.findMediaType({
      id: mediaTypeDTO.id,
    });
    if (!mediaType)
      throw new HttpException(
        AppError.MEDIA_TYPE_NOT_FOUND,
        HttpStatus.NOT_FOUND,
      );
    return await this.mediaTypeService.updateMediaType(mediaTypeDTO);
  }
  @ApiTags('MediaTypeAPI')
  @ApiResponse({ status: 200, type: StatusMediaTypeResponse })
  @HasRoles(Role.Manager, Role.Admin)
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Delete()
  async deleteMediaType(
    @Body() mediaTypeDTO: DeleteMediaTypeDTO,
  ): Promise<StatusMediaTypeResponse> {
    const mediaType = await this.mediaTypeService.findMediaType({
      id: mediaTypeDTO.id,
    });
    if (!mediaType)
      throw new HttpException(
        AppError.MEDIA_TYPE_NOT_FOUND,
        HttpStatus.NOT_FOUND,
      );
    return await this.mediaTypeService.deleteMediaType(mediaTypeDTO);
  }
  @ApiTags('MediaTypeAPI')
  @ApiResponse({ status: 200, type: MediaTypeResponse })
  @UseInterceptors(CacheInterceptor)
  @CacheTTL(30)
  @Get('all')
  async getroductTypes(): Promise<MediaTypeResponse[]> {
    return this.mediaTypeService.getMediaTypes();
  }
}
