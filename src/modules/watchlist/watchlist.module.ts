import { Module } from '@nestjs/common';
import { WatchlistService } from './watchlist.service';
import { WatchlistController } from './watchlist.controller';
import { Watchlist } from './models/watchlist.model';
import { SequelizeModule } from '@nestjs/sequelize';

@Module({
  imports: [SequelizeModule.forFeature([Watchlist])],
  providers: [WatchlistService],
  controllers: [WatchlistController],
})
export class WatchlistModule {}
