import { ApiProperty } from '@nestjs/swagger';
import { IsNumber, IsString } from 'class-validator';

export class CategoryDTO {
  @ApiProperty()
  parent_category_id: number | null;
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
export class CategoryUpdateDTO {
  @ApiProperty()
  @IsNumber()
  id: number;
  @ApiProperty()
  parent_category_id?: number | null;
  @ApiProperty()
  category_name?: string;
  @ApiProperty()
  category_image?: string;
  @ApiProperty()
  slug?: string;
}

export class CategoryDeleteDTO {
  @ApiProperty()
  @IsNumber()
  id: number;
}
