import { ApiProperty } from '@nestjs/swagger';
import { IsBoolean, IsString } from 'class-validator';

export class LeadTypeResponse {
  @ApiProperty()
  @IsString()
  lead_type_name: string;
}

export class LeadTypeStatusResponse {
  @ApiProperty()
  @IsBoolean()
  status: boolean;
}
