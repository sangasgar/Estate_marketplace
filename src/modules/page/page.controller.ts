import {
  Body,
  Controller,
  Delete,
  Get,
  HttpException,
  HttpStatus,
  Param,
  Patch,
  Post,
  UseGuards,
} from '@nestjs/common';
import { ApiResponse, ApiTags } from '@nestjs/swagger';
import { AppError } from 'src/common/constant/error';
import { JwtAuthGuard } from 'src/modules/auth/guards';
import { Role } from 'src/modules/auth/guards/enums/role.enum';
import { RolesGuard } from 'src/modules/auth/guards/role.guard';
import { HasRoles } from 'src/modules/auth/guards/roles.decorator';
import { PageDeleteDTO, PageDTO, UpdatePageDTO } from './dto';
import { PageService } from './page.service';
import { PageResponse, PagesResponse, PageStatusResponse } from './response';

@Controller('page')
export class PageController {
  constructor(private readonly pageService: PageService) {}
  @ApiTags('PageApi')
  @ApiResponse({ status: 200, type: PageResponse })
  @HasRoles(Role.Manager, Role.Authorized, Role.Admin)
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Post('add')
  async createPage(@Body() pageDTO: PageDTO): Promise<PageResponse> {
    const findPage = await this.pageService.findPage({
      page_title: pageDTO.page_title,
    });
    if (findPage)
      throw new HttpException(AppError.PAGE_EXIST, HttpStatus.FOUND);
    return this.pageService.createPage(pageDTO);
  }
  @ApiTags('PageApi')
  @ApiResponse({ status: 200, type: PageResponse })
  @HasRoles(Role.Manager, Role.Authorized, Role.Admin)
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Patch('update')
  updatePage(@Body() updatePageDTO: UpdatePageDTO): Promise<PageResponse> {
    return this.pageService.updatePage(updatePageDTO);
  }
  @ApiTags('PageApi')
  @ApiResponse({ status: 200, type: PageDeleteDTO })
  @HasRoles(Role.Manager, Role.Authorized, Role.Admin)
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Delete()
  async deletePage(
    @Body() pageDeleteDTO: PageDeleteDTO,
  ): Promise<PageStatusResponse> {
    const findPage = await this.pageService.findPage({
      id: pageDeleteDTO.id,
    });
    if (!findPage)
      throw new HttpException(AppError.PAGE_NOT_FOUND, HttpStatus.NOT_FOUND);
    return this.pageService.deletePage({
      id: pageDeleteDTO.id,
    });
  }
  @ApiTags('PageApi')
  @ApiResponse({ status: 200, type: PagesResponse })
  @HasRoles(Role.Manager, Role.Authorized, Role.Admin)
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Get('all')
  async getPages(): Promise<PagesResponse> {
    return this.pageService.getPages();
  }

  @ApiTags('PageApi')
  @ApiResponse({ status: 200, type: PagesResponse })
  @HasRoles(Role.Manager, Role.Authorized, Role.Admin)
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Get(':slug')
  async getPage(@Param('slug') id: number) {
    console.log(id);
  }
}
