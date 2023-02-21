import { Injectable, Query } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { Sequelize } from 'sequelize-typescript';
import { Users } from 'src/modules/user/models/user.model';
import { CompanyCreateDTO, DeleteCompany, UpdateCompany } from './dto';
import { Company, Company_Users } from './model/company.model';
import { Companies, CompanyResponse, StatusCompanyResponse } from './response';

@Injectable()
export class CompanyService {
  constructor(
    @InjectModel(Company)
    private readonly companyRepository: typeof Company,
    @InjectModel(Users)
    private readonly userRepository: typeof Users,
    @InjectModel(Company_Users)
    private readonly companyUsersRepository: typeof Company_Users,
    private sequelize: Sequelize,
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

  async createCompany(
    companyCreateDTO: CompanyCreateDTO,
  ): Promise<CompanyResponse> {
    try {
      const t = await this.sequelize.transaction();
      const company = await Company.create(
        {
          ...companyCreateDTO.company,
        },
        { transaction: t },
      );
      await this.companyUsersRepository.create(
        {
          user_id: companyCreateDTO.company.user_id,
          company_id: company.id,
        },
        { transaction: t },
      );
      await t.commit();

      return company;
    } catch (error) {
      throw new Error(error);
    }
  }
  async getCompanies(): Promise<Companies> {
    try {
      const companiesFind = await this.companyRepository.findAll();
      console.log(companiesFind);
      return;
    } catch (error) {
      throw new Error(error);
    }
  }
  async updateCompany(companyDto: UpdateCompany): Promise<CompanyResponse> {
    try {
      await this.companyRepository.update(
        {
          ...companyDto.company,
        },
        { where: { user_id: companyDto.company.user_id } },
      );
      const findCompany = await this.companyRepository.findOne({
        where: { user_id: companyDto.company.user_id },
      });
      return;
    } catch (error) {
      throw new Error(error);
    }
  }
  async deleteCompany(id: DeleteCompany): Promise<StatusCompanyResponse> {
    const deleteCompany = await this.companyRepository.destroy({
      where: { ...id },
    });
    if (deleteCompany) {
      return { status: true };
    }
    return { status: true };
  }
}
