import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { transliteration } from 'src/config/translit';
import { Property_Value } from '../property_value/model/property_value.model';
import {
  PropertyNameDeleteeDTO,
  PropertyNameDTO,
  PropertyNameUpdateDTO,
} from './dto';
import { Property_Name } from './model/property_name.model';
import { PropertyNameResponse, PropertyNameStatusResponse } from './response';

@Injectable()
export class PropertyNameService {
  constructor(
    @InjectModel(Property_Name)
    private readonly propertyNameRepository: typeof Property_Name,
  ) {}
  async findPropertyName(field) {
    try {
      const propertName = await this.propertyNameRepository.findOne({
        where: field,
      });
      return propertName;
    } catch (error) {
      throw new Error(error);
    }
  }
  async createPropertyName(
    propertyNameDTO: PropertyNameDTO,
  ): Promise<PropertyNameResponse> {
    try {
      const slug = transliteration(propertyNameDTO.properties_name);
      propertyNameDTO['slug'] = slug;
      const propertyName = await this.propertyNameRepository.create({
        ...propertyNameDTO,
      });
      return propertyName;
    } catch (error) {
      throw new Error(error);
    }
  }
  async updatePropertyName(
    propertyNameDTO: PropertyNameUpdateDTO,
  ): Promise<PropertyNameResponse> {
    try {
      const propertyName = await this.propertyNameRepository.update(
        {
          ...propertyNameDTO,
        },
        { where: { id: propertyNameDTO.id } },
      );
      const findPropertyName = await this.findPropertyName({
        id: propertyNameDTO.id,
      });
      return findPropertyName;
    } catch (error) {
      throw new Error(error);
    }
  }
  async getPropertyName(): Promise<PropertyNameResponse[]> {
    try {
      const productName = await this.propertyNameRepository.findAll({
        include: Property_Value,
      });
      return productName;
    } catch (error) {
      throw new Error(error);
    }
  }
  async deletePropertyName(
    propertyNameDTO: PropertyNameDeleteeDTO,
  ): Promise<PropertyNameStatusResponse> {
    try {
      const propertyName = await this.propertyNameRepository.destroy({
        where: { id: propertyNameDTO.id },
      });
      if (propertyName) {
        return { status: true };
      }
      if (propertyName) {
        return { status: false };
      }
    } catch (error) {
      throw new Error(error);
    }
  }
}
