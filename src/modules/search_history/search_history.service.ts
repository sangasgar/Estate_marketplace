import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { SearchHistoryDeleteDTO, SearchHistoryDTO } from './dto';
import { Search_History } from './model/search_history.model';
import { SearchHistoryResponse, SearchHistoryStatus } from './response';

@Injectable()
export class SearchHistoryService {
  constructor(
    @InjectModel(Search_History)
    private readonly searchHistoryRepository: typeof Search_History,
  ) {}
  async findSearchHistory(field): Promise<SearchHistoryResponse> {
    try {
      const searchHistory = await this.searchHistoryRepository.findOne({
        where: { ...field },
      });
      return searchHistory;
    } catch (error) {
      throw new Error(error);
    }
  }
  async getSearchHistory(): Promise<SearchHistoryResponse[]> {
    try {
      const searchHistory = await this.searchHistoryRepository.findAll();
      return searchHistory;
    } catch (error) {
      throw new Error(error);
    }
  }
  async createSearchHistory(
    searchHistoryDTO: SearchHistoryDTO,
  ): Promise<SearchHistoryResponse> {
    try {
      const searchHistory = await this.searchHistoryRepository.create({
        ...searchHistoryDTO,
      });
      return searchHistory;
    } catch (error) {
      throw new Error(error);
    }
  }
  async deleteSearchHistory(
    id: SearchHistoryDeleteDTO,
  ): Promise<SearchHistoryStatus> {
    try {
      const deleteSearchHistory = await this.searchHistoryRepository.destroy({
        where: { ...id },
      });
      if (deleteSearchHistory) return { status: true };
      if (!deleteSearchHistory) return { status: false };
    } catch (error) {
      throw new Error(error);
    }
  }
}
