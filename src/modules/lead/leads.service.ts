import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { LeadTypeDeleteDTO, LeadTypeDTO, LeadTypeUpdateDTO } from './dto';
import { Lead_Type } from './model/lead.model';
import { LeadTypeResponse, LeadTypeStatusResponse } from './response';

@Injectable()
export class LeadsService {
  constructor(
    @InjectModel(Lead_Type)
    private readonly leadTypeRepository: typeof Lead_Type,
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
  ): Promise<LeadTypeStatusResponse> {
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
}
