import { ApiProperty } from '@nestjs/swagger';
import { IsNumber, IsString } from 'class-validator';
import { Category } from 'src/modules/category/model/category.model';
import { Company } from 'src/modules/company/model/company.model';
import { Media_type } from 'src/modules/media_type/model/media_type.model';
import { Tags } from 'src/modules/tags/model/tags.model';
import { PropertyValue_Products } from '../model/product.model';

export class PropertyDTO {
  @ApiProperty()
  @IsString()
  product_name: string;
  @ApiProperty()
  @IsString()
  product_title: string;
  @ApiProperty()
  product_short_description: string;
  @ApiProperty()
  @IsString()
  product_description: string;
  @ApiProperty()
  product_is_visible: boolean;
  @ApiProperty()
  @IsNumber()
  product_price: number;
  @ApiProperty()
  product_sku_developer: string;
  @ApiProperty()
  product_old_price: number;
  @ApiProperty()
  product_purchase_price: number;
  @ApiProperty()
  product_discount_percent: number;
  @ApiProperty()
  product_discount_price: number;
  @ApiProperty()
  product_quantity: number;
  @ApiProperty()
  @IsNumber()
  product_category_id: Category;
  @ApiProperty()
  property_values_id: PropertyValue_Products[];
  @ApiProperty()
  product_keywords: string;
  @ApiProperty()
  product_media_type: Media_type[];
  @ApiProperty()
  product_description_meta: string;
  @ApiProperty()
  product_description_short_seo: string;
  @ApiProperty()
  product_description_seo: string;
  @ApiProperty()
  tags_id: Tags[];
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
  property_values_id?: PropertyValue_Products[];
  @ApiProperty()
  product_keywords?: string;
  @ApiProperty()
  company_id?: Company;
  @ApiProperty()
  product_media_type?: Media_type[];
  @ApiProperty()
  product_description_meta?: string;
  @ApiProperty()
  product_description_short_seo?: string;
  @ApiProperty()
  product_description_seo?: string;
  @ApiProperty()
  tags_id?: Tags[];
}
export class ProductFindDTO {
  @ApiProperty()
  id?: number;
  @ApiProperty()
  slug?: string;
}
export class ProductDeleteDTO {
  @ApiProperty()
  @IsNumber()
  id: number;
}
// Пример запроса
// {
//     "product_name": "Property Dubai",
//     "product_title": "Property Dubai",
//     "product_short_description": "Dubai",
//     "product_description": "Property",
//     "product_is_visible": true,
//     "product_price": 15000000,
//     "product_sku_developer": "101",
//     "product_old_price": 15500000,
//     "product_purchase_price": 10000000,
//     "product_discount_percent": 20,
//     "product_discount_price": 13000000,
//     "product_quantity": 1,
//     "product_category_id": 1,
//     "product_keywords": "property",
//     "product_type_id": 1,
//     "company_id": 1,
//     "Media_type": [
//       {
//         "product_media_url": "url",
//         "product_id": 1,
//         "media_type_id": 1
//       }
//     ],
//     "product_description_meta": "property good",
//     "product_description_short_seo": "property",
//     "product_description_seo": "property",
//     "Tags": [
//       {
//         "tag_id": 1,
//         "product_id": 1
//       }
//     ]
//   }
