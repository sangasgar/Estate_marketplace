import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { Media_type } from '../media_type/model/media_type.model';
import { Tags } from '../tags/model/tags.model';
import { PropertyDTO } from './dto';
import { Product, Products_Media_Types, Viewed } from './model/product.model';
import { PropertyResponse } from './response';

@Injectable()
export class ProductService {
  constructor(
    @InjectModel(Product) private readonly productRepository: typeof Product,
    @InjectModel(Products_Media_Types)
    private readonly productMediaTypesRepository: typeof Products_Media_Types,
    @InjectModel(Viewed)
    private readonly viewedRepository: typeof Viewed,
  ) {}
  async findProduct(field) {
    try {
      const product = await this.productRepository.findOne({ where: field });
      return product;
    } catch (error) {
      throw new Error(error);
    }
  }
  async createProduct(propertyDTO: PropertyDTO): Promise<PropertyResponse> {
    try {
      console.log(propertyDTO);
      const product = await this.productRepository.create({
        ...propertyDTO,
      });
      return;
    } catch (error) {
      throw new Error(error);
    }
  }
}
