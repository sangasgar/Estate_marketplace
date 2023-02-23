import { ApiProperty } from '@nestjs/swagger';
import { IsObject, IsString } from 'class-validator';

export class CompanyDTO {
  @ApiProperty()
  user_id: number;
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
  id?: number;
  @ApiProperty()
  company_name?: string;
  @ApiProperty()
  id_number?: string;
  @ApiProperty()
  page_id?: number;
  @ApiProperty()
  company_phone?: string;
  @ApiProperty()
  company_address?: string;
}

export class DeleteCompanyDTO {
  @ApiProperty()
  id?: number;
  @ApiProperty()
  id_number?: string;
}
