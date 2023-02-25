import { Module } from '@nestjs/common';
import { LeadsService } from './leads.service';
import { LeadsController } from './leads.controller';
import { SequelizeModule } from '@nestjs/sequelize';
import { Leads, Lead_Type } from './model/lead.model';

@Module({
  imports: [SequelizeModule.forFeature([Lead_Type, Leads])],
  providers: [LeadsService],
  controllers: [LeadsController],
})
export class LeadsModule {}
