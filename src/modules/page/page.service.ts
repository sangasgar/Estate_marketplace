import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { transliteration } from 'src/config/translit';
import { PageDeleteDTO, PageDTO, UpdatePageDTO } from './dto';
import { Page } from './model/page.model';
import { PageResponse, PagesResponse, PageStatusResponse } from './response';

@Injectable()
export class PageService {
  constructor(
    @InjectModel(Page) private readonly pageRepository: typeof Page,
  ) {}
  async findPage(field): Promise<PageResponse> {
    const page = await this.pageRepository.findOne({ where: { ...field } });
    return page;
  }
  async createPage(createPageDto: PageDTO): Promise<PageResponse> {
    try {
      if (createPageDto.page_title) {
        const trans = transliteration(createPageDto.page_title);
        createPageDto['slug'] = trans;
      }
      const page = await this.pageRepository.create({ ...createPageDto });
      return page;
    } catch (error) {
      throw new Error(error);
    }
  }
  async deletePage(id: PageDeleteDTO): Promise<PageStatusResponse> {
    try {
      const deletePage = await this.pageRepository.destroy({
        where: { ...id },
      });
      if (deletePage === 1) {
        return { status: true };
      } else {
        return { status: false };
      }
    } catch (error) {
      throw new Error(error);
    }
  }
  async getPages(): Promise<PagesResponse> {
    const pages = await this.pageRepository.findAll();
    return { pages };
  }
  async getPage(): Promise<PageResponse> {
    const pages = await this.pageRepository.findOne();
    return;
  }
  async updatePage(updatePageDTO: UpdatePageDTO): Promise<PageResponse> {
    try {
      await this.pageRepository.update(
        {
          ...updatePageDTO,
        },
        {
          where: { id: updatePageDTO.id },
        },
      );
      const findPage = await this.findPage({ id: updatePageDTO.id });
      return findPage;
    } catch (error) {
      throw new Error(error);
    }
  }
}
