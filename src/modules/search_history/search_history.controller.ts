import {
  Body,
  Controller,
  Delete,
  Get,
  HttpException,
  HttpStatus,
  Post,
  Req,
  UseGuards,
} from '@nestjs/common';
import { ApiResponse, ApiTags } from '@nestjs/swagger';
import { AppError } from 'src/common/constant/error';
import { JwtAuthGuard } from '../auth/guards';
import { Role } from '../auth/guards/enums/role.enum';
import { RolesGuard } from '../auth/guards/role.guard';
import { HasRoles } from '../auth/guards/roles.decorator';
import { SearchHistoryDeleteDTO, SearchHistoryDTO } from './dto';
import { SearchHistoryResponse } from './response';
import { SearchHistoryService } from './search_history.service';

@Controller('search-history')
export class SearchHistoryController {
  constructor(private readonly searchHistoryService: SearchHistoryService) {}
  @ApiTags('SearchHistoryAPI')
  @ApiResponse({ status: 200, type: SearchHistoryResponse })
  @HasRoles(Role.Admin, Role.Authorized, Role.Manager)
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Post('add')
  async createSearchHistory(
    @Body() searchHistoryDTO: SearchHistoryDTO,
    @Req() request,
  ): Promise<SearchHistoryResponse> {
    const user = request.user;
    const findSearchHistory = await this.searchHistoryService.findSearchHistory(
      searchHistoryDTO,
    );
    if (findSearchHistory)
      throw new HttpException(AppError.SEARCH_HISTORY_FOUND, HttpStatus.FOUND);
    searchHistoryDTO['user_id'] = user.id;
    return this.searchHistoryService.createSearchHistory(searchHistoryDTO);
  }
  @ApiTags('SearchHistoryAPI')
  @ApiResponse({ status: 200, type: SearchHistoryResponse })
  @Get('all')
  async getAllSearchHistory(): Promise<SearchHistoryResponse[]> {
    return this.searchHistoryService.getSearchHistory();
  }
  @ApiTags('SearchHistoryAPI')
  @ApiResponse({ status: 200, type: SearchHistoryResponse })
  @HasRoles(Role.Admin, Role.Authorized, Role.Manager)
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Delete()
  async deleteSearchHistory(@Body() id: SearchHistoryDeleteDTO) {
    const findSearchHistory = await this.searchHistoryService.findSearchHistory(
      id,
    );
    if (!findSearchHistory)
      throw new HttpException(
        AppError.SEARCH_HISTORY_NOT_FOUND,
        HttpStatus.NOT_FOUND,
      );
    return this.searchHistoryService.deleteSearchHistory(id);
  }
}
