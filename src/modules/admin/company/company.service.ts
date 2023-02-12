import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { AppError } from 'src/common/constant/error';
import { CompanyCreateDTO } from './dto';
import { Company } from './model/company.model';
import { CreateCompanyResponse, ErrorCompanyResponse } from './response';

@Injectable()
export class CompanyService {
  constructor(
    @InjectModel(Company)
    private readonly companyRepository: typeof Company,
  ) {}
  async createCompany(
    companyCreateDTO: CompanyCreateDTO,
  ): Promise<CreateCompanyResponse | ErrorCompanyResponse> {
    const companyExist = await this.companyRepository.findOne({
      where: { id_number: companyCreateDTO.id_number },
    });
    if (companyExist) {
      const company = await this.companyRepository.create({ companyCreateDTO });
      return {
        company_name: company.company_name,
        id_number: company.id_number,
        page_id: company.page_id,
        company_phone: company.company_phone,
        company_address: company.company_address,
      };
    } else {
      return { error: AppError.COMPANY_EXIST };
    }
  }
}
