import { ApiProperty } from '@nestjs/swagger';
import { IsBoolean, IsObject } from 'class-validator';

export class PageResponse {
  @ApiProperty()
  page_title: string;
  @ApiProperty()
  page_image: string;
  @ApiProperty()
  short_page_description: string;
  @ApiProperty()
  page_description_html: string;
  @ApiProperty()
  page_keywords: string;
  @ApiProperty()
  page_description_meta: string;
  @ApiProperty()
  page_description_short_seo: string;
  @ApiProperty()
  page_description_seo: string;
}
export class PageStatusResponse {
  @ApiProperty()
  @IsBoolean()
  status: boolean;
}
