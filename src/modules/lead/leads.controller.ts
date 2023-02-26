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
import { LeadTypeDeleteDTO, LeadTypeDTO, LeadTypeUpdateDTO } from './dto';
import { LeadsService } from './leads.service';
import { LeadTypeResponse, LeadTypeStatusResponse } from './response';

@Controller('lead-type')
export class LeadsController {
  constructor(private readonly leadsService: LeadsService) {}
  @ApiTags('LeadTypeAPI')
  @ApiResponse({ status: 200, type: LeadTypeResponse })
  @HasRoles(Role.Manager, Role.Admin)
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Post()
  async createLeadType(
    @Body() leadTypeDTO: LeadTypeDTO,
  ): Promise<LeadTypeResponse> {
    leadTypeDTO.lead_type_name =
      leadTypeDTO.lead_type_name[0].toUpperCase() +
      leadTypeDTO.lead_type_name.substring(1).toLowerCase();
    const leadType = await this.leadsService.findLeadType({
      lead_type_name: leadTypeDTO.lead_type_name,
    });
    if (leadType)
      throw new HttpException(AppError.LEAD_TYPE_FOUND, HttpStatus.FOUND);
    return await this.leadsService.createLeadType(leadTypeDTO);
  }
  @ApiTags('LeadTypeAPI')
  @ApiResponse({ status: 200, type: LeadTypeResponse })
  @HasRoles(Role.Manager, Role.Admin)
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Patch()
  async updateLeadType(
    @Body() leadTypeDTO: LeadTypeUpdateDTO,
  ): Promise<LeadTypeResponse> {
    leadTypeDTO.lead_type_name =
      leadTypeDTO.lead_type_name[0].toUpperCase() +
      leadTypeDTO.lead_type_name.substring(1).toLowerCase();

    const leadType = await this.leadsService.findLeadType({
      id: leadTypeDTO.id,
    });
    if (!leadType)
      throw new HttpException(
        AppError.LEAD_TYPE_NOT_FOUND,
        HttpStatus.NOT_FOUND,
      );
    return await this.leadsService.updateLeadType(leadTypeDTO);
  }
  @ApiTags('LeadTypeAPI')
  @ApiResponse({ status: 200, type: LeadTypeStatusResponse })
  @HasRoles(Role.Manager, Role.Admin)
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Delete()
  async deleteLeadType(
    @Body() leadTypeDTO: LeadTypeDeleteDTO,
  ): Promise<LeadTypeStatusResponse> {
    const leadType = await this.leadsService.findLeadType({
      id: leadTypeDTO.id,
    });
    if (!leadType)
      throw new HttpException(
        AppError.LEAD_TYPE_NOT_FOUND,
        HttpStatus.NOT_FOUND,
      );
    return await this.leadsService.deleteLeadType(leadTypeDTO);
  }
  @ApiTags('LeadTypeAPI')
  @ApiResponse({ status: 200, type: LeadTypeResponse })
  @UseInterceptors(CacheInterceptor)
  @CacheTTL(30)
  @Get('all')
  async getLeadType(): Promise<LeadTypeResponse[]> {
    return this.leadsService.getLeadType();
  }
}
