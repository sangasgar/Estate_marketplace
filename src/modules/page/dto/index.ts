import { ApiProperty } from '@nestjs/swagger';
import { IsNumber, IsObject, IsString } from 'class-validator';

export class PageDTO {
  @ApiProperty()
  @IsString()
  page_title: string;
  @ApiProperty()
  page_image?: string;
  @ApiProperty()
  short_page_description?: string;
  @ApiProperty()
  @IsString()
  page_description_html: string;
  @ApiProperty()
  page_keywords?: string;
  @ApiProperty()
  page_description_meta?: string;
  @ApiProperty()
  page_description_short_seo?: string;
  @ApiProperty()
  page_description_seo?: string;
}

export class UpdatePageDTO {
  @ApiProperty()
  @IsNumber()
  id: number;
  @ApiProperty()
  page_title?: string;
  @ApiProperty()
  page_image?: string;
  @ApiProperty()
  short_page_description?: string;
  @ApiProperty()
  page_description_html?: string;
  @ApiProperty()
  page_keywords?: string;
  @ApiProperty()
  page_description_meta?: string;
  @ApiProperty()
  page_description_short_seo?: string;
  @ApiProperty()
  page_description_seo?: string;
}

export class PageDeleteDTO {
  @ApiProperty()
  @IsNumber()
  id: number;
}
