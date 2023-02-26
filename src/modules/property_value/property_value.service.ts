import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { transliteration } from 'src/config/translit';
import {
  PropertyValueDeleteeDTO,
  PropertyValueDTO,
  PropertyValueUpdateDTO,
} from './dto';
import { Property_Value } from './model/property_value.model';
import { PropertyValueResponse, PropertyValueStatusResponse } from './response';

@Injectable()
export class PropertyValueService {
  constructor(
    @InjectModel(Property_Value)
    private readonly propertValueRepository: typeof Property_Value,
  ) {}
  async findPropertyValue(field) {
    try {
      const propertValue = await this.propertValueRepository.findOne({
        where: field,
      });
      return propertValue;
    } catch (error) {
      throw new Error(error);
    }
  }
  async createPropertyValue(
    propertyValueDTO: PropertyValueDTO,
  ): Promise<PropertyValueResponse> {
    try {
      const slug = transliteration(propertyValueDTO.properties_value_name);
      propertyValueDTO['slug'] = slug;
      const propertyValue = await this.propertValueRepository.create({
        ...propertyValueDTO,
      });
      return propertyValue;
    } catch (error) {
      throw new Error(error);
    }
  }
  async updatePropertyValue(
    propertyValueDTO: PropertyValueUpdateDTO,
  ): Promise<PropertyValueResponse> {
    try {
      const propertyValue = await this.propertValueRepository.update(
        {
          ...propertyValueDTO,
        },
        { where: { id: propertyValueDTO.id } },
      );
      const findPropertyValue = await this.findPropertyValue({
        id: propertyValueDTO.id,
      });
      return findPropertyValue;
    } catch (error) {
      throw new Error(error);
    }
  }
  async deletePropertyValue(
    propertyValueDTO: PropertyValueDeleteeDTO,
  ): Promise<PropertyValueStatusResponse> {
    try {
      const propertyValue = await this.propertValueRepository.destroy({
        where: { id: propertyValueDTO.id },
      });
      if (propertyValue) {
        return { status: true };
      }
      if (propertyValue) {
        return { status: false };
      }
    } catch (error) {
      throw new Error(error);
    }
  }
  async getPropertyValue(): Promise<PropertyValueResponse[]> {
    try {
      const productValue = await this.propertValueRepository.findAll();
      return productValue;
    } catch (error) {
      throw new Error(error);
    }
  }
}
