import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { DeleteLeadStatusDTO, LeadStatusDTO, LeadStatusUpdateDTO } from './dto';
import { Lead_Status } from './model/lead_status.model';
import { LeadStatusBoolResponse, LeadStatusResponse } from './response';

@Injectable()
export class LeadStatusService {
  constructor(
    @InjectModel(Lead_Status)
    private readonly leadStatusRepository: typeof Lead_Status,
  ) {}
  async findLeadStatus(field) {
    try {
      const leadStatus = this.leadStatusRepository.findOne({ where: field });
      return leadStatus;
    } catch (error) {
      throw new Error(error);
    }
  }
  async createLeadStatus(
    leadStatusDTO: LeadStatusDTO,
  ): Promise<LeadStatusResponse> {
    try {
      const leadStatus = await this.leadStatusRepository.create({
        ...leadStatusDTO,
      });
      return leadStatus;
    } catch (error) {
      throw new Error(error);
    }
  }
  async updateMediaType(
    leadStatusDTO: LeadStatusUpdateDTO,
  ): Promise<LeadStatusResponse> {
    try {
      await this.leadStatusRepository.update(
        {
          ...leadStatusDTO,
        },
        { where: { id: leadStatusDTO.id } },
      );
      const findLeadStatus = await this.findLeadStatus({
        id: leadStatusDTO.id,
      });
      return findLeadStatus;
    } catch (error) {
      throw new Error(error);
    }
  }
  async deleteLeadStatus(
    leadStatusDTO: DeleteLeadStatusDTO,
  ): Promise<LeadStatusBoolResponse> {
    try {
      this.leadStatusRepository.destroy({ where: { id: leadStatusDTO.id } });

      return { status: true };
    } catch (error) {
      throw new Error(error);
    }
  }
  async getLeadStatus(): Promise<LeadStatusResponse[]> {
    try {
      const leadStatus = await this.leadStatusRepository.findAll();
      return leadStatus;
    } catch (error) {
      throw new Error(error);
    }
  }
}
