import { ApiProperty } from '@nestjs/swagger';
import { IsBoolean, IsNumber, IsObject, IsString } from 'class-validator';

export class PropertyNameResponse {
  @ApiProperty()
  @IsString()
  properties_name: string;
  @ApiProperty()
  @IsString()
  properties_icon: string;
  @ApiProperty()
  @IsString()
  slug: string;
}
export class PropertyNameStatusResponse {
  @ApiProperty()
  @IsBoolean()
  status: boolean;
}
