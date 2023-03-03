import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { Category } from '../category/model/category.model';
import { Company, Company_Users } from '../company/model/company.model';
import { Property_Name } from '../property_name/model/property_name.model';
import { Property_Value } from '../property_value/model/property_value.model';
import { Tags } from '../tags/model/tags.model';
import { Users } from '../user/models/user.model';
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
    @InjectModel(Tags)
    private readonly tagsRepository: typeof Tags,
    @InjectModel(PropertyValue_Products)
    private readonly propertyValueProductsRepository: typeof PropertyValue_Products,
    @InjectModel(Users)
    private readonly userRepository: typeof Users,
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

  async getProduct(
    productFindDTO: ProductFindDTO,
    user_id: number,
  ): Promise<PropertyResponse> {
    try {
      Product.belongsToMany(Tags, {
        through: Product_Tags,
        foreignKey: 'product_id',
        otherKey: 'tag_id',
      });
      Product.belongsToMany(Property_Value, {
        through: PropertyValue_Products,
        foreignKey: 'product_id',
        otherKey: 'property_value_id',
      });
      Users.belongsToMany(Company, {
        through: Company_Users,
        foreignKey: 'user_id',
        otherKey: 'company_id',
      });
      const product = await this.productRepository.findAll({
        attributes: { exclude: ['product_category_id'] },
        include: [
          { model: Category },
          {
            model: Tags,
            as: 'tags',
          },
          {
            model: Property_Value,
            as: 'property_value',
            include: [{ model: Property_Name }],
          },
        ],
        where: { ...productFindDTO },
      });
      const userCompany = await this.userRepository.findOne({
        where: { id: user_id },
        attributes: [],
        include: [
          {
            model: Company,
            as: 'company',
          },
        ],
      });
      if (user_id) {
        await this.viewedRepository.findOrCreate({
          where: { user_id, product_id: product[0].id },
        });
      }
      const getProduct = JSON.parse(JSON.stringify(product[0]));
      getProduct['company'] = JSON.parse(JSON.stringify(userCompany.company));
      return getProduct;
    } catch (error) {
      throw new Error(error);
    }
  }
}
