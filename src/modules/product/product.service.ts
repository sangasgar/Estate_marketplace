import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { Category } from '../category/model/category.model';
import { Media_type } from '../media_type/model/media_type.model';
import { Property_Value } from '../property_value/model/property_value.model';
import { Tags } from '../tags/model/tags.model';
import { ProductFindDTO, PropertyDTO } from './dto';
import {
  Product,
  Products_Media_Types,
  Product_Tags,
  PropertyValue_Products,
  Viewed,
} from './model/product.model';
import { PropertyResponse } from './response';

@Injectable()
export class ProductService {
  constructor(
    @InjectModel(Product) private readonly productRepository: typeof Product,
    @InjectModel(Products_Media_Types)
    private readonly productMediaTypesRepository: typeof Products_Media_Types,
    @InjectModel(Viewed)
    private readonly viewedRepository: typeof Viewed,
    @InjectModel(Product_Tags)
    private readonly productTagsRepository: typeof Product_Tags,
    @InjectModel(PropertyValue_Products)
    private readonly propertyValueProductsRepository: typeof PropertyValue_Products,
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
      const product = await this.productRepository.create({
        ...propertyDTO,
      });
      if (propertyDTO.tags_id) {
        const tagsArray = propertyDTO.tags_id.map((el) => ({
          tag_id: el,
          product_id: product.id,
        }));
        await this.productTagsRepository.bulkCreate(tagsArray);
      }
      if (propertyDTO.property_values_id) {
        const propertydArray = propertyDTO.property_values_id.map((el) => ({
          property_value_id: el,
          product_id: product.id,
        }));
        await this.propertyValueProductsRepository.bulkCreate(propertydArray);
      }
      return;
    } catch (error) {
      throw new Error(error);
    }
  }
  async getProduct(productFindDTO: ProductFindDTO) {
    const product = await this.productRepository.findOne({
      include: [{ model: Category }],
      where: { ...productFindDTO },
    });
    Tags.hasMany(Product_Tags, { foreignKey: 'tag_id' });
    const tagsId = await this.productTagsRepository.findAll({
      include: Tags,
      where: { product_id: product.id },
    });
    console.log(tagsId);
    return product;
  }
}
