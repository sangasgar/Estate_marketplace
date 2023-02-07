import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { WatchlistDTO } from './dto';
import { Watchlist } from './models/watchlist.model';
import { CreateAssetResponse } from './response';

@Injectable()
export class WatchlistService {
  constructor(
    @InjectModel(Watchlist)
    private readonly watchlistRepository: typeof Watchlist,
  ) {}
  async createAsset(user, dto): Promise<CreateAssetResponse> {
    try {
      const watchlist = {
        user: user.id,
        name: dto.name,
        assetId: dto.assetId,
      };
      await this.watchlistRepository.create(watchlist);
      return watchlist;
    } catch (error) {
      throw new Error(error);
    }
  }
  async deleteAsset(id, assetId): Promise<boolean> {
    try {
      await this.watchlistRepository.destroy({ where: { user: id, assetId } });
      return true;
    } catch (error) {
      throw new Error(error);
    }
  }
}
