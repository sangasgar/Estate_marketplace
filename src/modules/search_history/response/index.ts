import { ApiProperty } from '@nestjs/swagger';
import { IsBoolean, IsString } from 'class-validator';

export class SearchHistoryResponse {
  @ApiProperty()
  @IsString()
  search_history_text: string;
}
export class SearchHistoryStatus {
  @ApiProperty()
  @IsBoolean()
  status: boolean;
}
