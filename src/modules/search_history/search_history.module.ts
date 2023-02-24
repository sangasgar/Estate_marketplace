import { Module } from '@nestjs/common';
import { SequelizeModule } from '@nestjs/sequelize';
import { Search_History } from './model/search_history.model';
import { SearchHistoryController } from './search_history.controller';
import { SearchHistoryService } from './search_history.service';

@Module({
  imports: [SequelizeModule.forFeature([Search_History])],
  controllers: [SearchHistoryController],
  providers: [SearchHistoryService],
})
export class SearchHistoryModule {}
