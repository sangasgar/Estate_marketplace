import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { CompanyDTO } from './dto';
import { Company } from './model/company.model';
import { Companies, CompanyResponse, StatusCompanyResponse } from './response';

@Injectable()
export class CompanyService {
  constructor(
    @InjectModel(Company)
    private readonly companyRepository: typeof Company,
  ) {}
  async findCompany(field): Promise<boolean> {
    try {
      const companyExist = await this.companyRepository.findOne({
        where: field,
      });
      if (companyExist) {
        return true;
      } else false;
    } catch (error) {
      throw new Error(error);
    }
  }

  async createCompany(companyCreateDTO: CompanyDTO): Promise<CompanyResponse> {
    try {
      const company = await this.companyRepository.create({
        company_name: companyCreateDTO.company_name,
        id_number: companyCreateDTO.id_number,
        page_id: companyCreateDTO.page_id,
        company_phone: companyCreateDTO.company_phone,
        company_address: companyCreateDTO.company_address,
      });
      return {
        company_name: company.company_name,
        id_number: company.id_number,
        page_id: company.page_id,
        company_phone: company.company_phone,
        company_address: company.company_address,
      };
    } catch (error) {
      throw new Error(error);
    }
  }
  async getCompanies(): Promise<Companies> {
    try {
      const companiesFind = await this.companyRepository.findAll();
      return { companies: companiesFind };
    } catch (error) {
      throw new Error(error);
    }
  }
  async updateCompany(companyDto): Promise<CompanyDTO> {
    try {
      await this.companyRepository.update(
        {
          company_name: companyDto.company.company_name,
          id_number: companyDto.company.id_number,
          page_id: companyDto.company.page_id,
          company_phone: companyDto.company.company_phone,
          company_address: companyDto.company.company_address,
        },
        { where: { id: companyDto.id } },
      );
      const findCompany = await this.companyRepository.findOne({
        where: { id: companyDto.id },
      });
      return {
        company_name: findCompany.company_name,
        id_number: findCompany.id_number,
        page_id: findCompany.page_id,
        company_phone: findCompany.company_phone,
        company_address: findCompany.company_address,
      };
    } catch (error) {
      throw new Error(error);
    }
  }
  async deleteCompany(id): Promise<StatusCompanyResponse> {
    const deleteCompany = await this.companyRepository.destroy({
      where: { ...id },
    });
    if (deleteCompany) {
      return { status: true };
    }
    return { status: true };
  }
}
