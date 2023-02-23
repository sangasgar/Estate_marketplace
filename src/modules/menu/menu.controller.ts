import {
  Body,
  Controller,
  Delete,
  Get,
  HttpException,
  HttpStatus,
  Patch,
  Post,
  UseGuards,
} from '@nestjs/common';
import { ApiResponse, ApiTags } from '@nestjs/swagger';
import { AppError } from 'src/common/constant/error';
import { JwtAuthGuard } from '../auth/guards';
import { Role } from '../auth/guards/enums/role.enum';
import { RolesGuard } from '../auth/guards/role.guard';
import { HasRoles } from '../auth/guards/roles.decorator';
import { MenuDeleteDTO, MenuDTO, MenuUpdateDTO } from './dto';
import { MenuService } from './menu.service';
import { MenuResponse, MenuStatusResponse } from './response';

@Controller('menu')
export class MenuController {
  constructor(private readonly menuService: MenuService) {}
  @ApiTags('MenuApi')
  @ApiResponse({ status: 200 })
  @HasRoles(Role.Admin, Role.Authorized, Role.Manager)
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Post('add')
  async createMenu(@Body() menuDTO: MenuDTO): Promise<MenuResponse> {
    const menu = await this.menuService.findMenu({
      menu_name: menuDTO.menu_name,
    });
    if (menu) throw new HttpException(AppError.NENU_FOUND, HttpStatus.FOUND);
    return this.menuService.createMenu(menuDTO);
  }
  @ApiTags('MenuApi')
  @ApiResponse({ status: 200, type: MenuResponse })
  @HasRoles(Role.Admin, Role.Authorized, Role.Manager)
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Patch('update')
  async updateMenu(@Body() menuUpdate: MenuUpdateDTO): Promise<MenuResponse> {
    const menu = await this.menuService.findMenu({
      id: menuUpdate.id,
    });
    if (!menu)
      throw new HttpException(AppError.NENU_NOT_FOUND, HttpStatus.NOT_FOUND);
    return this.menuService.updateMenu(menuUpdate);
  }

  @ApiTags('MenuApi')
  @ApiResponse({ status: 200, type: MenuResponse })
  @Get('all')
  async getAllMenu(): Promise<MenuResponse[]> {
    return this.menuService.getAllMenu();
  }

  @ApiTags('MenuApi')
  @ApiResponse({ status: 200 })
  @HasRoles(Role.Admin, Role.Authorized, Role.Manager)
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Delete()
  async deleteMenu(
    @Body() deleteMenu: MenuDeleteDTO,
  ): Promise<MenuStatusResponse> {
    const menu = await this.menuService.findMenu({
      id: deleteMenu.id,
    });
    if (!menu)
      throw new HttpException(AppError.NENU_NOT_FOUND, HttpStatus.NOT_FOUND);
    return this.menuService.deleteMenu(deleteMenu);
  }
}
