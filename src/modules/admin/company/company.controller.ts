import {
  Body,
  Controller,
  Delete,
  Get,
  HttpException,
  HttpStatus,
  Patch,
  Post,
  Req,
  UseGuards,
} from '@nestjs/common';
import { AppError } from 'src/common/constant/error';
import { ApiResponse, ApiTags } from '@nestjs/swagger';
import { JwtAuthGuard } from 'src/modules/auth/guards';
import { CompanyService } from './company.service';
import { CompanyDTO, DeleteCompany, UpdateCompany } from './dto';
import { CompanyResponse, StatusCompanyResponse } from './response';

@Controller('dashboard/company')
export class CompanyController {
  constructor(private readonly companyService: CompanyService) {}
  @ApiTags('CompanyApi')
  @ApiResponse({ status: 200 })
  @UseGuards(JwtAuthGuard)
  @Post('add')
  async createCompany(
    @Body() companyCreateDTO: CompanyDTO,
    @Req() request,
  ): Promise<CompanyResponse> {
    const user = request.user;
    companyCreateDTO.user_id = user.id;
    const findCompany = await this.companyService.findCompany({
      id_number: companyCreateDTO.id_number,
    });
    if (findCompany)
      throw new HttpException(AppError.COMPANY_EXIST, HttpStatus.FOUND);
    return this.companyService.createCompany(companyCreateDTO);
  }
  @ApiTags('CompanyApi')
  @ApiResponse({ status: 200 })
  @UseGuards(JwtAuthGuard)
  @Get('all')
  async getCompanies() {
    return this.companyService.getCompanies();
  }

  @ApiTags('CompanyApi')
  @ApiResponse({ status: 200 })
  @UseGuards(JwtAuthGuard)
  @Patch('update')
  async updateCompany(@Body() company: UpdateCompany, @Req() request) {
    const user = request.user;
    company.user_id = user.id;
    const findCompany = await this.companyService.findCompany({
      user_id: company.user_id,
    });
    company.user_id = user.id;
    if (!findCompany)
      throw new HttpException(AppError.COMPANY_NOT_FOUND, HttpStatus.NOT_FOUND);
    return this.companyService.updateCompany(company);
  }
  @ApiTags('CompanyApi')
  @ApiResponse({ status: 200 })
  @UseGuards(JwtAuthGuard)
  @Delete()
  async deleteCompany(
    @Body() deleteCompany: DeleteCompany,
  ): Promise<StatusCompanyResponse> {
    const findCompany = await this.companyService.findCompany({
      ...deleteCompany,
    });
    if (!findCompany)
      throw new HttpException(AppError.COMPANY_NOT_FOUND, HttpStatus.NOT_FOUND);
    return this.companyService.deleteCompany(deleteCompany);
  }
}
