import {
  Body,
  Controller,
  Delete,
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
import {
  PropertyValueDeleteeDTO,
  PropertyValueDTO,
  PropertyValueUpdateDTO,
} from './dto';
import { PropertyValueService } from './property_value.service';
import { PropertyValueResponse, PropertyValueStatusResponse } from './response';

@Controller('property-value')
export class PropertyValueController {
  constructor(private readonly propertyValueService: PropertyValueService) {}
  @ApiTags('PropertyValueAPI')
  @ApiResponse({ status: 200, type: PropertyValueResponse })
  @HasRoles(Role.Manager, Role.Admin)
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Post('add')
  async createPropertyValue(
    @Body()
    propertyValueDTO: PropertyValueDTO,
  ): Promise<PropertyValueResponse> {
    propertyValueDTO.properties_value_name =
      propertyValueDTO.properties_value_name.toLowerCase();
    const findPropertyValue = await this.propertyValueService.findPropertyValue(
      {
        properties_value_name: propertyValueDTO.properties_value_name,
      },
    );
    if (findPropertyValue)
      throw new HttpException(AppError.PROPERTY_VALUE_FOUND, HttpStatus.FOUND);
    return this.propertyValueService.createPropertyValue(propertyValueDTO);
  }
  @ApiTags('PropertyValueAPI')
  @ApiResponse({ status: 200, type: PropertyValueResponse })
  @HasRoles(Role.Manager, Role.Admin)
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Patch('update')
  async updatePropertyValue(
    @Body()
    propertyValueDTO: PropertyValueUpdateDTO,
  ): Promise<PropertyValueResponse> {
    if (propertyValueDTO.properties_value_name) {
      propertyValueDTO.properties_value_name =
        propertyValueDTO.properties_value_name.toLowerCase();
    }
    const findPropertyValue = await this.propertyValueService.findPropertyValue(
      {
        id: propertyValueDTO.id,
      },
    );
    if (!findPropertyValue)
      throw new HttpException(
        AppError.PROPERTY_VALUE_NOT_FOUND,
        HttpStatus.NOT_FOUND,
      );
    return this.propertyValueService.updatePropertyValue(propertyValueDTO);
  }
  @ApiTags('PropertyValueAPI')
  @ApiResponse({ status: 200, type: PropertyValueStatusResponse })
  @HasRoles(Role.Manager, Role.Admin)
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Delete()
  async deletePropertyValue(
    @Body() propertyValueDeleteeDTO: PropertyValueDeleteeDTO,
  ): Promise<PropertyValueStatusResponse> {
    const findPropertyValue = await this.propertyValueService.findPropertyValue(
      {
        id: propertyValueDeleteeDTO.id,
      },
    );
    if (!findPropertyValue)
      throw new HttpException(
        AppError.PROPERTY_VALUE_NOT_FOUND,
        HttpStatus.NOT_FOUND,
      );
    return this.propertyValueService.deletePropertyValue({
      id: propertyValueDeleteeDTO.id,
    });
  }
}
