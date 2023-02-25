import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { transliteration } from 'src/config/translit';
import {
  ProductTypeDeleteDTO,
  ProductTypeDTO,
  ProductTypeUpdateDTO,
} from './dto';
import { Product_Type } from './model/product_type.model';
import { Product_TypeResponse, Product_Type_Update_Response } from './response';

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
  async getroductTypes(): Promise<Product_TypeResponse[]> {
    const product_type = await this.productTypeRepository.findAll();
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
    productTypeUpdateDTO: ProductTypeUpdateDTO,
  ): Promise<Product_TypeResponse> {
    await this.productTypeRepository.update(
      {
        ...productTypeUpdateDTO,
      },
      { where: { id: productTypeUpdateDTO.id } },
    );
    const productTypeFind = await this.findProductType({
      id: productTypeUpdateDTO.id,
    });
    return productTypeFind;
  }
  async deleteProductType(
    productTypeStatusDTO: ProductTypeDeleteDTO,
  ): Promise<Product_Type_Update_Response> {
    const product_type = await this.productTypeRepository.destroy({
      where: { id: productTypeStatusDTO.id },
    });
    if (product_type == 1) {
      return { status: true };
    }
    if (product_type == 0) {
      return { status: false };
    }
  }
}
