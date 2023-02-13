import { ApiProperty } from '@nestjs/swagger';
import { IsNumber, IsObject, IsString } from 'class-validator';

export class CompanyDTO {
  @ApiProperty()
  @IsString()
  company_name: string;
  @ApiProperty()
  @IsString()
  id_number: string;
  @ApiProperty()
  page_id?: number;
  @ApiProperty()
  @IsString()
  company_phone: string;
  @ApiProperty()
  @IsString()
  company_address: string;
}
export class UpdateCompany {
  @ApiProperty()
  @IsNumber()
  id: number;
  @ApiProperty()
  @IsObject()
  company: {
    company_name?: string;
    id_number?: string;
    page_id?: number;
    company_phone?: string;
    company_address?: string;
  };
}
export class DeleteCompany {
  @ApiProperty()
  id?: number;
  @ApiProperty()
  id_number?: string;
}
