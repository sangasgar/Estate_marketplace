import { ApiProperty } from '@nestjs/swagger';
import { IsBoolean, IsNumber, IsString } from 'class-validator';
import { Category } from 'src/modules/category/model/category.model';
import { Company } from 'src/modules/company/model/company.model';
import { Media_type } from 'src/modules/media_type/model/media_type.model';
import { Product_Type } from 'src/modules/product_type/model/product_type.model';
import { Tags } from 'src/modules/tags/model/tags.model';

export class PropertyDTO {
  @ApiProperty()
  @IsString()
  product_name: string;
  @ApiProperty()
  @IsString()
  product_title: string;
  @ApiProperty()
  @IsString()
  product_short_description: string;
  @ApiProperty()
  @IsString()
  product_description: string;
  @ApiProperty()
  @IsBoolean()
  product_is_visible: boolean;
  @ApiProperty()
  @IsNumber()
  product_price: number;
  @ApiProperty()
  @IsString()
  product_sku_developer: string;
  @ApiProperty()
  @IsNumber()
  product_old_price: number;
  @ApiProperty()
  @IsNumber()
  product_purchase_price: number;
  @ApiProperty()
  product_discount_percent: number;
  @ApiProperty()
  @IsNumber()
  product_discount_price: number;
  @ApiProperty()
  @IsNumber()
  product_quantity: number;
  @ApiProperty()
  @IsNumber()
  product_category_id: Category;
  @ApiProperty()
  @IsString()
  product_keywords: string;
  @ApiProperty()
  @IsNumber()
  product_type_id: Product_Type;
  @ApiProperty()
  @IsNumber()
  company_id: Company;
  @ApiProperty()
  @IsNumber()
  product_media_type: Media_type;
  @ApiProperty()
  @IsString()
  product_description_meta: string;
  @ApiProperty()
  @IsString()
  product_description_short_seo: string;
  @ApiProperty()
  @IsString()
  product_description_seo: string;
  @ApiProperty()
  @IsNumber()
  tags: Tags;
  @ApiProperty()
  @IsString()
  slug: string;
}

export class PropertyUpdateDTO {
  @ApiProperty()
  @IsNumber()
  id: number;
  @ApiProperty()
  product_name?: string;
  @ApiProperty()
  product_title?: string;
  @ApiProperty()
  product_short_description?: string;
  @ApiProperty()
  product_description?: string;
  @ApiProperty()
  product_is_visible?: boolean;
  @ApiProperty()
  product_price?: number;
  @ApiProperty()
  @IsString()
  product_sku_developer?: string;
  @ApiProperty()
  product_old_price?: number;
  @ApiProperty()
  product_purchase_price?: number;
  @ApiProperty()
  product_discount_percent?: number;
  @ApiProperty()
  product_discount_price?: number;
  @ApiProperty()
  product_quantity?: number;
  @ApiProperty()
  product_category_id?: Category;
  @ApiProperty()
  product_keywords?: string;
  @ApiProperty()
  product_type_id?: Product_Type;
  @ApiProperty()
  company_id?: Company;
  @ApiProperty()
  product_media_type?: Media_type;
  @ApiProperty()
  product_description_meta?: string;
  @ApiProperty()
  product_description_short_seo?: string;
  @ApiProperty()
  product_description_seo?: string;
  @ApiProperty()
  tags?: Tags;
}
export class ProductDeleteDTO {
  @ApiProperty()
  @IsNumber()
  id: number;
}
