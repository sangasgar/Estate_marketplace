import { ApiProperty } from '@nestjs/swagger';
import { IsNumber, IsString } from 'class-validator';

export class PropertyNameDTO {
  @ApiProperty()
  @IsString()
  properties_name: string;
  @ApiProperty()
  properties_icon?: string;
  @ApiProperty()
  @IsNumber()
  product_type_id: number;
}
export class PropertyNameUpdateDTO {
  @ApiProperty()
  @IsNumber()
  id: number;
  @ApiProperty()
  properties_name?: string;
  @ApiProperty()
  properties_icon?: string;
  @ApiProperty()
  product_type_id?: number;
}
export class PropertyNameDeleteeDTO {
  @ApiProperty()
  @IsNumber()
  id: number;
}
