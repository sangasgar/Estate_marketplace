import { Module } from '@nestjs/common';
import { SequelizeModule } from '@nestjs/sequelize';
import { LeadStatusController } from './lead_status.controller';
import { LeadStatusService } from './lead_status.service';
import { Lead_Status } from './model/lead_status.model';

@Module({
  imports: [SequelizeModule.forFeature([Lead_Status])],
  controllers: [LeadStatusController],
  providers: [LeadStatusService],
})
export class LeadStatusModule {}
