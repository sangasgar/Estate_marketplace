import {
  Body,
  CacheInterceptor,
  CacheTTL,
  Controller,
  Delete,
  Get,
  HttpException,
  HttpStatus,
  Patch,
  Post,
  UseGuards,
  UseInterceptors,
} from '@nestjs/common';
import { ApiResponse, ApiTags } from '@nestjs/swagger';
import { AppError } from 'src/common/constant/error';
import { JwtAuthGuard } from '../auth/guards';
import { Role } from '../auth/guards/enums/role.enum';
import { RolesGuard } from '../auth/guards/role.guard';
import { HasRoles } from '../auth/guards/roles.decorator';
import {
  PropertyNameDeleteeDTO,
  PropertyNameDTO,
  PropertyNameUpdateDTO,
} from './dto';
import { PropertyNameService } from './property_name.service';
import { PropertyNameResponse, PropertyNameStatusResponse } from './response';

@Controller('property-name')
export class PropertyNameController {
  constructor(private readonly propertyNameService: PropertyNameService) {}
  @ApiTags('PropertyNameAPI')
  @ApiResponse({ status: 200, type: PropertyNameResponse })
  @HasRoles(Role.Manager, Role.Admin)
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Post()
  async createPropertyName(
    @Body()
    propertyNameDTO: PropertyNameDTO,
  ): Promise<PropertyNameResponse> {
    propertyNameDTO.properties_name =
      propertyNameDTO.properties_name[0].toUpperCase() +
      propertyNameDTO.properties_name.substring(1).toLowerCase();
    const findPropertyName = await this.propertyNameService.findPropertyName({
      properties_name: propertyNameDTO.properties_name,
    });
    if (findPropertyName)
      throw new HttpException(AppError.PROPERTY_NAME_FOUND, HttpStatus.FOUND);
    return this.propertyNameService.createPropertyName(propertyNameDTO);
  }
  @ApiTags('PropertyNameAPI')
  @ApiResponse({ status: 200, type: PropertyNameResponse })
  @HasRoles(Role.Manager, Role.Admin)
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Patch()
  async updatePropertyName(
    @Body()
    propertyNameDTO: PropertyNameUpdateDTO,
  ): Promise<PropertyNameResponse> {
    if (propertyNameDTO.properties_name) {
      propertyNameDTO.properties_name =
        propertyNameDTO.properties_name[0].toUpperCase() +
        propertyNameDTO.properties_name.substring(1).toLowerCase();
    }
    const findPropertyName = await this.propertyNameService.findPropertyName({
      id: propertyNameDTO.id,
    });
    if (!findPropertyName)
      throw new HttpException(
        AppError.PROPERTY_NAME_NOT_FOUND,
        HttpStatus.NOT_FOUND,
      );
    return this.propertyNameService.updatePropertyName(propertyNameDTO);
  }
  @ApiTags('PropertyNameAPI')
  @ApiResponse({ status: 200, type: PropertyNameStatusResponse })
  @HasRoles(Role.Manager, Role.Admin)
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Delete()
  async deletePropertyName(
    @Body() propertyNameDeleteeDTO: PropertyNameDeleteeDTO,
  ): Promise<PropertyNameStatusResponse> {
    const findPropertyName = await this.propertyNameService.findPropertyName({
      id: propertyNameDeleteeDTO.id,
    });
    if (!findPropertyName)
      throw new HttpException(
        AppError.PROPERTY_NAME_NOT_FOUND,
        HttpStatus.NOT_FOUND,
      );
    return this.propertyNameService.deletePropertyName({
      id: propertyNameDeleteeDTO.id,
    });
  }
  @ApiTags('PropertyNameAPI')
  @ApiResponse({ status: 200, type: PropertyNameDTO })
  @UseInterceptors(CacheInterceptor)
  @CacheTTL(30)
  @Get('all')
  async getroductTypes(): Promise<PropertyNameResponse[]> {
    return this.propertyNameService.getPropertyName();
  }
}
