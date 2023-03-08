import { Module } from '@nestjs/common';
import { SequelizeModule } from '@nestjs/sequelize';
import { SeederModule } from 'nestjs-sequelize-seeder';
import { LeadStatusController } from './lead_status.controller';
import { LeadStatusService } from './lead_status.service';
import { Lead_Status } from './model/lead_status.model';
import { LeadStatusSeeds } from './seeds';

@Module({
  imports: [
    SequelizeModule.forFeature([Lead_Status]),
    SeederModule.forFeature([LeadStatusSeeds]),
  ],
  controllers: [LeadStatusController],
  providers: [LeadStatusService],
})
export class LeadStatusModule {}
