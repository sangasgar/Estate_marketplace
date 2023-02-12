import { Body, Controller, Post, UseGuards } from '@nestjs/common';
import { ApiResponse, ApiTags } from '@nestjs/swagger';
import { JwtAuthGuard } from 'src/modules/auth/guards';
import { CompanyService } from './company.service';
import { CompanyCreateDTO } from './dto';
import { CreateCompanyResponse, ErrorCompanyResponse } from './response';

@Controller('dashboard/company')
export class CompanyController {
  constructor(private readonly companyService: CompanyService) {}
  @ApiTags('CompanyApi')
  @ApiResponse({ status: 200 })
  @UseGuards(JwtAuthGuard)
  @Post('add')
  createCompany(
    @Body() companyCreateDTO: CompanyCreateDTO,
  ): Promise<CreateCompanyResponse | ErrorCompanyResponse> {
    return this.companyService.createCompany(companyCreateDTO);
  }
}
