import { ApiProperty } from '@nestjs/swagger';
import { IsObject, IsString } from 'class-validator';

export class CompanyDTO {
  @ApiProperty()
  user_id: string;
  @ApiProperty()
  company_name: string;
  @ApiProperty()
  @IsString()
  id_number: string;
  @ApiProperty()
  page_id?: number;
  @ApiProperty()
  company_phone?: string;
  @ApiProperty()
  company_address?: string;
}
export class CompanyUpdateDTO {
  @ApiProperty()
  user_id: string;
  @ApiProperty()
  id?: number;
  @ApiProperty()
  company_name: string;
  @ApiProperty()
  id_number: string;
  @ApiProperty()
  page_id?: number;
  @ApiProperty()
  company_phone?: string;
  @ApiProperty()
  company_address?: string;
}

export class CompanyCreateDTO {
  @ApiProperty()
  @IsObject()
  company: CompanyDTO;
}

export class UpdateCompany {
  @ApiProperty()
  @IsObject()
  company: CompanyUpdateDTO;
}
export class DeleteCompany {
  @ApiProperty()
  id?: number;
  @ApiProperty()
  id_number?: string;
}
