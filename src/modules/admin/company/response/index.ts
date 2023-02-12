import { ApiProperty } from '@nestjs/swagger';
import { IsString } from 'class-validator';

export class CreateCompanyResponse {
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
export class ErrorCompanyResponse {
  @ApiProperty()
  @IsString()
  error: string;
}
