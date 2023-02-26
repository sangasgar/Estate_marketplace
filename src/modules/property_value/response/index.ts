import { ApiProperty } from '@nestjs/swagger';
import { IsBoolean, IsNumber, IsObject, IsString } from 'class-validator';
import { Property_Name } from 'src/modules/property_name/model/property_name.model';

export class PropertyValueResponse {
  @ApiProperty()
  @IsString()
  properties_value_name: string;
  @ApiProperty()
  @IsString()
  slug: string;
  @ApiProperty()
  @IsObject()
  properties_name_id: Property_Name;
}
export class PropertyValueStatusResponse {
  @ApiProperty()
  @IsBoolean()
  status: boolean;
}
