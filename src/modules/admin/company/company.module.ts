import { Module } from '@nestjs/common';
import { SequelizeModule } from '@nestjs/sequelize';
import { Users } from 'src/modules/user/models/user.model';
import { CompanyController } from './company.controller';
import { CompanyService } from './company.service';
import { Company } from './model/company.model';

@Module({
  imports: [SequelizeModule.forFeature([Company, Users])],
  controllers: [CompanyController],
  providers: [CompanyService],
})
export class CompanyModule {}
