import { Module } from '@nestjs/common';
import { LeadsService } from './leads.service';
import { LeadsController } from './leads.controller';
import { SequelizeModule } from '@nestjs/sequelize';
import { Leads, Lead_Type } from './model/lead.model';
import { SeederModule } from 'nestjs-sequelize-seeder';
import { LeadTypeSeeds } from './seeds';
import { MailModule } from '../mail/mail.module';

@Module({
  imports: [
    SequelizeModule.forFeature([Lead_Type, Leads]),
    SeederModule.forFeature([LeadTypeSeeds]),
    MailModule,
  ],
  providers: [LeadsService],
  controllers: [LeadsController],
})
export class LeadsModule {}
