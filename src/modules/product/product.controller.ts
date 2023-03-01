import {
  Body,
  CacheInterceptor,
  CacheTTL,
  Controller,
  Get,
  HttpException,
  HttpStatus,
  Param,
  Post,
  Req,
  UploadedFile,
  UploadedFiles,
  UseGuards,
  UseInterceptors,
} from '@nestjs/common';
import { ApiBody, ApiConsumes, ApiResponse, ApiTags } from '@nestjs/swagger';
import { JwtAuthGuard } from '../auth/guards';
import { Role } from '../auth/guards/enums/role.enum';
import { RolesGuard } from '../auth/guards/role.guard';
import { HasRoles } from '../auth/guards/roles.decorator';
import { PropertyDTO } from './dto';
import { ProductService } from './product.service';
import { PropertyResponse } from './response';
import { transliteration } from '../../config/translit';
import { AppError } from 'src/common/constant/error';
import { FilesInterceptor } from '@nestjs/platform-express';
import { isString } from 'class-validator';

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
    propertyDTO.product_name =
      propertyDTO.product_name[0].toUpperCase() +
      propertyDTO.product_name.substring(1).toLowerCase();
    propertyDTO.product_title =
      propertyDTO.product_title[0].toUpperCase() +
      propertyDTO.product_title.substring(1).toLowerCase();
    const slug = transliteration(propertyDTO.product_name);
    propertyDTO['slug'] = slug;
    propertyDTO['product_frontend_id'] = Math.floor(
      Math.random() * (9999999999 - 1111111111) + 1111111111,
    );
    const findProduct = await this.productService.findProduct({
      product_name: propertyDTO.product_name,
    });
    if (findProduct)
      throw new HttpException(AppError.PRODUCT_FOUND, HttpStatus.FOUND);
    return this.productService.createProduct(propertyDTO);
  }
  @Get(':slugOrId')
  @UseInterceptors(CacheInterceptor)
  @CacheTTL(30)
  async getProduct(@Param('slugOrId') slugOrId: any, @Req() request) {
    const user = request.user;
    let findProduct;
    const dto = {};
    if (!Number(slugOrId)) {
      dto['slug'] = slugOrId;
      findProduct = await this.productService.findProduct({
        slug: slugOrId,
      });
    }
    if (Number(slugOrId)) {
      dto['id'] = slugOrId;
      findProduct = await this.productService.findProduct({
        id: slugOrId,
      });
    }
    if (!findProduct)
      throw new HttpException(AppError.PRODUCT_NOT_FOUND, HttpStatus.NOT_FOUND);
    return this.productService.getProduct(dto);
  }
  @Post('uploads')
  @UseInterceptors(FilesInterceptor('files')) // 👈  using FilesInterceptor here
  @ApiConsumes('multipart/form-data')
  @ApiBody({
    schema: {
      type: 'object',
      properties: {
        files: {
          type: 'array', // 👈  array of files
          items: {
            type: 'string',
            format: 'binary',
          },
        },
      },
    },
  })
  uploadFiles(@UploadedFiles() files: Array<Express.Multer.File>) {
    console.log(files);
  }
}
