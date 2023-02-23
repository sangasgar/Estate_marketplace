import { ApiProperty } from '@nestjs/swagger';
import { IsNumber, IsString } from 'class-validator';

export class MenuDTO {
  @ApiProperty()
  parent_menu_id: number | null;
  @ApiProperty()
  @IsString()
  menu_name: string;
  @ApiProperty()
  @IsString()
  menu_image: string;
  @ApiProperty()
  @IsString()
  page_slug: string;
}
export class MenuUpdateDTO {
  @ApiProperty()
  @IsNumber()
  id: number;
  @ApiProperty()
  parent_menu_id?: number | null;
  @ApiProperty()
  menu_name?: string;
  @ApiProperty()
  menu_image?: string;
  @ApiProperty()
  page_slug?: string;
}

export class MenuDeleteDTO {
  @ApiProperty()
  @IsNumber()
  id: number;
}
