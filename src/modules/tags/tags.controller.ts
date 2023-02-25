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
import { TagDeleteDTO, TagDTO, TagUpdateDTO } from './dto';
import { TagResponse, TagUpdateResponse } from './response';
import { TagsService } from './tags.service';

@Controller('tags')
export class TagsController {
  constructor(private readonly tagService: TagsService) {}
  @ApiTags('TagsAPI')
  @ApiResponse({ status: 200, type: TagResponse })
  @HasRoles(Role.Manager, Role.Authorized, Role.Admin)
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Post('add')
  async addTags(@Body() tagDTO: TagDTO): Promise<TagResponse> {
    tagDTO.tag_name = tagDTO.tag_name.toLowerCase();
    const tags = await this.tagService.findTag(tagDTO);
    if (tags) throw new HttpException(AppError.TAG_FOUND, HttpStatus.FOUND);
    const tagCreate = await this.tagService.createTag(tagDTO);
    return tagCreate;
  }
  @ApiTags('TagsAPI')
  @ApiResponse({ status: 200, type: TagResponse })
  @HasRoles(Role.Manager, Role.Authorized, Role.Admin)
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Patch('update')
  async updateTags(@Body() tagUpdateDTO: TagUpdateDTO): Promise<TagResponse> {
    tagUpdateDTO.tag_name = tagUpdateDTO.tag_name.toLowerCase();
    const tags = await this.tagService.findTag({ id: tagUpdateDTO.id });
    if (!tags)
      throw new HttpException(AppError.TAG_FOUND, HttpStatus.NOT_FOUND);
    return this.tagService.updateTag(tagUpdateDTO);
  }
  @ApiTags('TagsAPI')
  @ApiResponse({ status: 200, type: TagUpdateResponse })
  @HasRoles(Role.Manager, Role.Authorized, Role.Admin)
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Delete()
  async deleteTag(@Body() id: TagDeleteDTO): Promise<TagUpdateResponse> {
    const tags = await this.tagService.findTag(id);
    if (!tags)
      throw new HttpException(AppError.TAG_NOT_FOUND, HttpStatus.NOT_FOUND);
    return this.tagService.deleteTag(id);
  }
  @ApiTags('TagsAPI')
  @ApiResponse({ status: 200, type: TagResponse })
  @UseInterceptors(CacheInterceptor)
  @CacheTTL(30)
  @Get()
  async getTags(): Promise<TagResponse[]> {
    return await this.tagService.findTags();
  }
}
