import { ApiProperty } from '@nestjs/swagger';
import { IsBoolean, IsString } from 'class-validator';

export class LeadStatusResponse {
  @ApiProperty()
  @IsString()
  lead_status_name: string;
}

export class LeadStatusBoolResponse {
  @ApiProperty()
  @IsBoolean()
  status: boolean;
}
