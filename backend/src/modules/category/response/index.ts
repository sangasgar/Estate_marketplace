import { ApiProperty } from '@nestjs/swagger';
import { IsBoolean, IsNumber, IsString } from 'class-validator';

export class CategoryResponse {
  @ApiProperty()
  @IsNumber()
  parent_category_id: number;
  @ApiProperty()
  @IsString()
  category_name: string;
  @ApiProperty()
  @IsString()
  category_image: string;
  @ApiProperty()
  @IsString()
  slug: string;
}
export class CategoryStatusResponse {
  @ApiProperty()
  @IsBoolean()
  status: boolean;
}
