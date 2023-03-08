import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsNumber, IsString } from 'class-validator';

export class LeadTypeDTO {
  @ApiProperty()
  @IsString()
  lead_type_name: string;
  @ApiProperty()
  price?: number;
}
export class LeadTypeUpdateDTO {
  @ApiProperty()
  @IsNumber()
  id: number;
  @ApiProperty()
  lead_type_name?: string;
  @ApiProperty()
  price?: number;
}
export class LeadTypeDeleteDTO {
  @ApiProperty()
  @IsNumber()
  id: number;
}
export class LeadsDTO {
  @ApiProperty()
  @IsString()
  name: string;
  @ApiProperty()
  @IsString()
  phone: string;
  @ApiProperty()
  email: string;
  @ApiProperty()
  comment: string;
}
