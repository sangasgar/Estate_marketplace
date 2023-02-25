import {
  Body,
  Controller,
  HttpException,
  HttpStatus,
  Patch,
  Post,
  UseGuards,
} from '@nestjs/common';
import { ApiResponse, ApiTags } from '@nestjs/swagger';
import { AppError } from 'src/common/constant/error';
import { JwtAuthGuard } from '../auth/guards';
import { Role } from '../auth/guards/enums/role.enum';
import { RolesGuard } from '../auth/guards/role.guard';
import { HasRoles } from '../auth/guards/roles.decorator';
import { ProductTypeDTO, ProductTypeUpdateDTO } from './dto';
import { ProductTypeService } from './product_type.service';
import { Product_TypeResponse } from './response';

@Controller('product-type')
export class ProductTypeController {
  constructor(private readonly productTypeService: ProductTypeService) {}
  @ApiTags('ProductTypeAPI')
  @ApiResponse({ status: 200 })
  @HasRoles(Role.Manager, Role.Authorized, Role.Admin)
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Post('add')
  async createProductType(
    @Body() productTypeDTO: ProductTypeDTO,
  ): Promise<Product_TypeResponse> {
    productTypeDTO.product_type_name =
      productTypeDTO.product_type_name[0].toUpperCase() +
      productTypeDTO.product_type_name.substring(1).toLowerCase();
    const productType = await this.productTypeService.findProductType(
      productTypeDTO,
    );
    if (productType)
      throw new HttpException(AppError.PRODUCT_TYPE_FOUND, HttpStatus.FOUND);
    return this.productTypeService.createProductType(productTypeDTO);
  }
  @ApiTags('ProductTypeAPI')
  @ApiResponse({ status: 200 })
  @HasRoles(Role.Manager, Role.Authorized, Role.Admin)
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Patch('update')
  async updateProductType(
    @Body() productTypeUpdateDTO: ProductTypeUpdateDTO,
  ): Promise<Product_TypeResponse> {
    productTypeUpdateDTO.product_type_name =
      productTypeUpdateDTO.product_type_name[0].toUpperCase() +
      productTypeUpdateDTO.product_type_name.substring(1).toLowerCase();
    const productType = await this.productTypeService.findProductType({
      id: productTypeUpdateDTO.id,
    });
    if (productType)
      throw new HttpException(AppError.PRODUCT_NOT_FOUND, HttpStatus.NOT_FOUND);
    return;
  }
}
