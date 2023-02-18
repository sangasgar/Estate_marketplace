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
        ...companyCreateDTO,
      });
      return {
        ...company,
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
  async updateCompany(companyDto): Promise<CompanyResponse> {
    try {
      await this.companyRepository.update(
        {
          ...companyDto.company,
        },
        { where: { user_id: companyDto.user_id } },
      );
      const findCompany = await this.companyRepository.findOne({
        where: { user_id: companyDto.user_id },
      });
      return {
        ...findCompany,
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
