import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { transliteration } from 'src/config/translit';
import { ProductTypeDTO, ProductTypeUpdateDTO } from './dto';
import { Product_Type } from './model/product_type.model';
import { Product_TypeResponse } from './response';

@Injectable()
export class ProductTypeService {
  constructor(
    @InjectModel(Product_Type)
    private readonly productTypeRepository: typeof Product_Type,
  ) {}
  async findProductType(field) {
    const product_type = await this.productTypeRepository.findOne({
      where: { ...field },
    });
    return product_type;
  }
  async createProductType(
    productTypeDTO: ProductTypeDTO,
  ): Promise<Product_TypeResponse> {
    const slug = transliteration(productTypeDTO.product_type_name);
    productTypeDTO['slug'] = slug;
    const product_type = await this.productTypeRepository.create({
      ...productTypeDTO,
    });
    return product_type;
  }
  async updateProductType(
    productTypeDTO: ProductTypeUpdateDTO,
  ): Promise<Product_TypeResponse> {
    const slug = transliteration(productTypeDTO.product_type_name);
    productTypeDTO['slug'] = slug;
    const product_type = await this.productTypeRepository.create({
      ...productTypeDTO,
    });
    return product_type;
  }
  async deleteProductType(
    productTypeDTO: Product_TypeDTO,
  ): Promise<Product_TypeResponse> {
    const slug = transliteration(productTypeDTO.product_type_name);
    productTypeDTO['slug'] = slug;
    const product_type = await this.productTypeRepository.create({
      ...productTypeDTO,
    });
    return product_type;
  }
}
