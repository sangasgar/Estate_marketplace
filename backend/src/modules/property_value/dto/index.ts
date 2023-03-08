import { ApiProperty } from '@nestjs/swagger';
import { IsNumber, IsString } from 'class-validator';

export class PropertyValueDTO {
  @ApiProperty()
  @IsString()
  properties_value_name: string;
  @ApiProperty()
  @IsNumber()
  properties_name_id: number;
}
export class PropertyValueUpdateDTO {
  @ApiProperty()
  @IsNumber()
  id: number;
  @ApiProperty()
  properties_value_name?: string;
  @ApiProperty()
  properties_name_id?: number;
}
export class PropertyValueDeleteeDTO {
  @ApiProperty()
  @IsNumber()
  id: number;
}
