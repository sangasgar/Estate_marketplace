import { ApiProperty } from '@nestjs/swagger';
import { IsBoolean, IsNumber, IsObject, IsString } from 'class-validator';
import { Page } from '../../page/model/page.model';

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
  page_id: Page;
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
