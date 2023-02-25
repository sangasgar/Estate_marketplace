import { ApiProperty } from '@nestjs/swagger';
import { IsBoolean, IsNumber, IsString } from 'class-validator';

export class MenuResponse {
  @ApiProperty()
  @IsNumber()
  parent_menu_id: number;
  @ApiProperty()
  @IsString()
  menu_name: string;
  @ApiProperty()
  @IsString()
  menu_image: string;
  @ApiProperty()
  @IsString()
  menu_slug: string;
}
export class MenuStatusResponse {
  @ApiProperty()
  @IsBoolean()
  status: boolean;
}
