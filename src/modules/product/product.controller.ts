import {
  Body,
  Controller,
  HttpException,
  HttpStatus,
  Post,
  Req,
  UseGuards,
} from '@nestjs/common';
import { ApiResponse, ApiTags } from '@nestjs/swagger';
import { JwtAuthGuard } from '../auth/guards';
import { Role } from '../auth/guards/enums/role.enum';
import { RolesGuard } from '../auth/guards/role.guard';
import { HasRoles } from '../auth/guards/roles.decorator';
import { PropertyDTO } from './dto';
import { ProductService } from './product.service';
import { PropertyResponse } from './response';
import { transliteration } from '../../config/translit';
import { AppError } from 'src/common/constant/error';

@Controller('products')
export class ProductController {
  constructor(private readonly productService: ProductService) {}
  @ApiTags('ProductApi')
  @ApiResponse({ status: 200 })
  @HasRoles(Role.Manager, Role.Authorized, Role.Admin)
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Post()
  async createProduct(
    @Body() propertyDTO: PropertyDTO,
    @Req() request,
  ): Promise<PropertyResponse> {
    const user_id = request.user.id;
    propertyDTO['user_id'] = user_id;
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
    propertyDTO.product_name =
      propertyDTO.product_name[0].toUpperCase() +
      propertyDTO.product_name.substring(1).toLowerCase();
    propertyDTO.product_title =
      propertyDTO.product_title[0].toUpperCase() +
      propertyDTO.product_title.substring(1).toLowerCase();
    const slug = transliteration(propertyDTO.product_name);
    propertyDTO['slug'] = slug;
    const findProduct = await this.productService.findProduct({
      product_name: propertyDTO.product_name,
    });
    console.log(propertyDTO);
    if (findProduct)
      throw new HttpException(AppError.PRODUCT_FOUND, HttpStatus.FOUND);
    return this.productService.createProduct(propertyDTO);
  }
}
