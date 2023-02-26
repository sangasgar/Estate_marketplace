import { Injectable, Query } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { Sequelize } from 'sequelize-typescript';
import { Users } from 'src/modules/user/models/user.model';
import { CompanyDTO, CompanyUpdateDTO, DeleteCompanyDTO } from './dto';
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

  async createCompany(companyCreateDTO: CompanyDTO): Promise<CompanyResponse> {
    try {
      const t = await this.sequelize.transaction();
      const company = await Company.create(
        {
          ...companyCreateDTO,
        },
        { transaction: t },
      );
      await this.companyUsersRepository.create(
        {
          user_id: companyCreateDTO.user_id,
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
  async getCompanies(): Promise<CompanyResponse[]> {
    try {
      const companiesFind = await this.companyRepository.findAll();
      return companiesFind;
    } catch (error) {
      throw new Error(error);
    }
  }
  async updateCompany(companyDto: CompanyUpdateDTO): Promise<CompanyResponse> {
    try {
      let findCompany = null;
      if (companyDto.id_number) {
        await this.companyRepository.update(
          {
            ...companyDto,
          },
          {
            where: { id_number: companyDto.id_number } || {
              id: companyDto.id,
            },
          },
        );
        findCompany = await this.companyRepository.findOne({
          where: { id_number: companyDto.id_number },
        });
      }
      if (companyDto.id) {
        await this.companyRepository.update(
          {
            ...companyDto,
          },
          {
            where: { id: companyDto.id },
          },
        );
        findCompany = await this.companyRepository.findOne({
          where: { id: companyDto.id },
        });
      }

      return findCompany;
    } catch (error) {
      throw new Error(error);
    }
  }
  async deleteCompany(id: DeleteCompanyDTO): Promise<StatusCompanyResponse> {
    const deleteCompany = await this.companyRepository.destroy({
      where: { ...id },
    });
    if (deleteCompany) {
      return { status: true };
    }
    return { status: true };
  }
}
