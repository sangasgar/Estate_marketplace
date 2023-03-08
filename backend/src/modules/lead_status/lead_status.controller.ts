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
import { DeleteLeadStatusDTO, LeadStatusDTO, LeadStatusUpdateDTO } from './dto';
import { LeadStatusService } from './lead_status.service';
import { LeadStatusBoolResponse, LeadStatusResponse } from './response';

@Controller('lead-status')
export class LeadStatusController {
  constructor(private readonly leadStatusService: LeadStatusService) {}
  @ApiTags('LeadStatusAPI')
  @ApiResponse({ status: 200, type: LeadStatusResponse })
  @HasRoles(Role.Manager, Role.Admin)
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Post()
  async createLeadStatus(
    @Body() leadStatusDTO: LeadStatusDTO,
  ): Promise<LeadStatusResponse> {
    leadStatusDTO.lead_status_name =
      leadStatusDTO.lead_status_name[0].toUpperCase() +
      leadStatusDTO.lead_status_name.substring(1).toLowerCase();
    const leadStatus = await this.leadStatusService.findLeadStatus({
      lead_status_name: leadStatusDTO.lead_status_name,
    });
    if (leadStatus)
      throw new HttpException(AppError.LEAD_STATUS_FOUND, HttpStatus.FOUND);
    return await this.leadStatusService.createLeadStatus(leadStatusDTO);
  }
  @ApiTags('LeadStatusAPI')
  @ApiResponse({ status: 200, type: LeadStatusResponse })
  @HasRoles(Role.Manager, Role.Admin)
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Patch()
  async updateLeadStatus(
    @Body() leadStatusDTO: LeadStatusUpdateDTO,
  ): Promise<LeadStatusResponse> {
    leadStatusDTO.lead_status_name =
      leadStatusDTO.lead_status_name[0].toUpperCase() +
      leadStatusDTO.lead_status_name.substring(1).toLowerCase();

    const leadStatus = await this.leadStatusService.findLeadStatus({
      id: leadStatusDTO.id,
    });
    if (!leadStatus)
      throw new HttpException(
        AppError.LEAD_STATUS_NOT_FOUND,
        HttpStatus.NOT_FOUND,
      );
    return await this.leadStatusService.updateMediaType(leadStatusDTO);
  }
  @ApiTags('LeadStatusAPI')
  @ApiResponse({ status: 200, type: LeadStatusBoolResponse })
  @HasRoles(Role.Manager, Role.Admin)
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Delete()
  async deleteLeadStatus(
    @Body() leadStatusDTO: DeleteLeadStatusDTO,
  ): Promise<LeadStatusBoolResponse> {
    const leadStatus = await this.leadStatusService.findLeadStatus({
      id: leadStatusDTO.id,
    });
    if (!leadStatus)
      throw new HttpException(
        AppError.LEAD_STATUS_NOT_FOUND,
        HttpStatus.NOT_FOUND,
      );
    return await this.leadStatusService.deleteLeadStatus(leadStatusDTO);
  }
  @ApiTags('LeadStatusAPI')
  @ApiResponse({ status: 200, type: LeadStatusResponse })
  @UseInterceptors(CacheInterceptor)
  @CacheTTL(30)
  @Get('all')
  async getLeadStatus(): Promise<LeadStatusResponse[]> {
    return this.leadStatusService.getLeadStatus();
  }
}
