import { Module } from '@nestjs/common';
import { SequelizeModule } from '@nestjs/sequelize';
import { SeederModule } from 'nestjs-sequelize-seeder';
import { Users } from 'src/modules/user/models/user.model';
import { CompanyController } from './company.controller';
import { CompanyService } from './company.service';
import { Company, Company_Users } from './model/company.model';
import { CompanySeeds } from './seeds';

@Module({
  imports: [
    SequelizeModule.forFeature([Company, Users, Company_Users]),
    SeederModule.forFeature([CompanySeeds]),
  ],
  controllers: [CompanyController],
  providers: [CompanyService],
})
export class CompanyModule {}
