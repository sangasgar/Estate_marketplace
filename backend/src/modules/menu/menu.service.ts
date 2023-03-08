import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { MenuDeleteDTO, MenuDTO, MenuUpdateDTO } from './dto';
import { Menu } from './model/menu.model';
import { MenuResponse, MenuStatusResponse } from './response';

@Injectable()
export class MenuService {
  constructor(
    @InjectModel(Menu) private readonly menuRepository: typeof Menu,
  ) {}
  async createMenu(menuDto: MenuDTO): Promise<MenuResponse> {
    try {
      const menu = await this.menuRepository.create({ ...menuDto });
      return menu;
    } catch (error) {
      throw new Error(error);
    }
  }
  async getAllMenu(): Promise<MenuResponse[]> {
    try {
      const menu = await this.menuRepository.findAll();
      return menu;
    } catch (error) {
      throw new Error(error);
    }
  }
  async findMenu(field): Promise<MenuResponse> {
    try {
      const menu = await this.menuRepository.findOne({
        where: field,
      });
      return menu;
    } catch (error) {
      throw new Error(error);
    }
  }

  async deleteMenu(id: MenuDeleteDTO): Promise<MenuStatusResponse> {
    try {
      const deleteMenu = await this.menuRepository.destroy({
        where: { ...id },
      });
      if (deleteMenu === 1) return { status: true };
    } catch (error) {
      throw new Error(error);
    }
  }

  async updateMenu(menuDTO: MenuUpdateDTO): Promise<MenuResponse> {
    try {
      await this.menuRepository.update(
        { ...menuDTO },
        { where: { id: menuDTO.id } },
      );
      return this.findMenu({ id: menuDTO.id });
    } catch (error) {
      throw new Error(error);
    }
  }
}
