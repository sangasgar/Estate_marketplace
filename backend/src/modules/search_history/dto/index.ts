import { ApiProperty } from '@nestjs/swagger';
import { IsNumber, IsString } from 'class-validator';

export class SearchHistoryDTO {
  @ApiProperty()
  @IsString()
  search_history_text: string;
}
export class SearchHistoryDeleteDTO {
  @ApiProperty()
  @IsNumber()
  id: number;
}
