import {
  Body,
  Controller,
  Delete,
  Get,
  Patch,
  Post,
  Query,
  Req,
  UseGuards,
} from '@nestjs/common';
import { ApiResponse, ApiTags } from '@nestjs/swagger';
import { JwtAuthGuard, JwtRefreshTokenGuard } from '../auth/guards';
import { WatchlistDTO } from './dto';
import { CreateAssetResponse } from './response';
import { WatchlistService } from './watchlist.service';

@Controller('watchlist')
export class WatchlistController {
  constructor(private readonly watchlistService: WatchlistService) {}
  @ApiTags('API')
  @ApiResponse({ status: 201, type: CreateAssetResponse })
  @UseGuards(JwtAuthGuard)
  @Post('create')
  createAsset(
    @Body() assetDto: WatchlistDTO,
    @Req() request,
  ): Promise<CreateAssetResponse> {
    const user = request.user;
    return this.watchlistService.createAsset(user, assetDto);
  }
  @ApiTags('API')
  @ApiResponse({ status: 200 })
  @UseGuards(JwtAuthGuard)
  @Delete()
  deleteAsset(@Query('id') assetId: string, @Req() request): Promise<boolean> {
    const { id } = request.user;
    return this.deleteAsset(id, assetId);
  }
}
