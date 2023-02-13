import { ApiProperty } from '@nestjs/swagger';
import { IsBoolean, IsString } from 'class-validator';

export class CompanyResponse {
  @ApiProperty()
  @IsString()
  company_name: string;
  @ApiProperty()
  @IsString()
  id_number: string;
  @ApiProperty()
  @IsString()
  company_phone: string;
  @ApiProperty()
  @IsString()
  page_id: number;
  @ApiProperty()
  @IsString()
  company_address: string;
}
export class Companies {
  @ApiProperty()
  companies: CompanyResponse[];
}
export class StatusCompanyResponse {
  @ApiProperty()
  @IsBoolean()
  status: boolean;
}
