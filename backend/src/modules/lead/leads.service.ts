import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { join } from 'path';
import { MailService } from '../mail/mail.service';
import {
  LeadsDTO,
  LeadTypeDeleteDTO,
  LeadTypeDTO,
  LeadTypeUpdateDTO,
} from './dto';
import { Leads, Lead_Type } from './model/lead.model';
import {
  LeadsResponse,
  LeadStatusResponse,
  LeadTypeResponse,
} from './response';

@Injectable()
export class LeadsService {
  constructor(
    private readonly mailService: MailService,
    @InjectModel(Lead_Type)
    private readonly leadTypeRepository: typeof Lead_Type,
    @InjectModel(Leads)
    private readonly leadsRepository: typeof Leads,
  ) {}
  async findLeadType(field) {
    try {
      const leadType = this.leadTypeRepository.findOne({ where: field });
      return leadType;
    } catch (error) {
      throw new Error(error);
    }
  }
  async createLeadType(leadTypeDTO: LeadTypeDTO): Promise<LeadTypeResponse> {
    try {
      const leadType = await this.leadTypeRepository.create({
        ...leadTypeDTO,
      });
      return leadType;
    } catch (error) {
      throw new Error(error);
    }
  }
  async updateLeadType(
    leadTypeDTO: LeadTypeUpdateDTO,
  ): Promise<LeadTypeResponse> {
    try {
      await this.leadTypeRepository.update(
        {
          ...leadTypeDTO,
        },
        { where: { id: leadTypeDTO.id } },
      );
      const findLeadType = await this.findLeadType({
        id: leadTypeDTO.id,
      });
      return findLeadType;
    } catch (error) {
      throw new Error(error);
    }
  }
  async deleteLeadType(
    leadTypeDTO: LeadTypeDeleteDTO,
  ): Promise<LeadStatusResponse> {
    try {
      this.leadTypeRepository.destroy({ where: { id: leadTypeDTO.id } });

      return { status: true };
    } catch (error) {
      throw new Error(error);
    }
  }
  async getLeadType(): Promise<LeadTypeResponse[]> {
    try {
      const leadType = await this.leadTypeRepository.findAll();
      return leadType;
    } catch (error) {
      throw new Error(error);
    }
  }
  async createLead(leadDto: LeadsDTO): Promise<LeadStatusResponse> {
    const lead = await this.leadsRepository.create({
      ...leadDto,
      company_id: 1,
      product_id: 1,
      lead_id: 1,
      lead_status_id: 1,
    });
    this.mailService.sendLead({
      name: lead.name,
      phone: lead.phone,
      email: lead.email,
      comment: lead.comment,
    });
    if (lead) return { status: true };
    if (!lead) return { status: false };
  }
  async getLeads(): Promise<LeadsResponse[]> {
    const leads = await this.leadsRepository.findAll();
    return leads;
  }
}
