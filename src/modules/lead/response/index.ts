import { ApiProperty } from '@nestjs/swagger';
import { IsBoolean, IsEmail, IsNumber, IsString } from 'class-validator';
import { Company } from 'src/modules/company/model/company.model';
import { Product } from 'src/modules/product/model/product.model';

export class LeadTypeResponse {
  @ApiProperty()
  @IsString()
  lead_type_name: string;
}

export class LeadStatusResponse {
  @ApiProperty()
  @IsBoolean()
  status: boolean;
}

export class LeadsResponse {
  @ApiProperty()
  @IsString()
  name: string;
  @ApiProperty()
  @IsString()
  phone: string;
  @ApiProperty()
  @IsEmail()
  email: string;
  @ApiProperty()
  comment: string;
  @ApiProperty()
  @IsNumber()
  company_id: Company;
  @ApiProperty()
  @IsNumber()
  product_id: Product;
}
