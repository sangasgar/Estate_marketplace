import { ApiProperty } from '@nestjs/swagger';
import { IsNumber, IsString } from 'class-validator';

export class LeadStatusDTO {
  @ApiProperty()
  @IsString()
  lead_status_name: string;
}
export class LeadStatusUpdateDTO {
  @ApiProperty()
  @IsNumber()
  id: number;
  @ApiProperty()
  lead_status_name?: string;
}
export class DeleteLeadStatusDTO {
  @ApiProperty()
  @IsNumber()
  id: number;
}
