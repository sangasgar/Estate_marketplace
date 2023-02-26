import { ApiProperty } from '@nestjs/swagger';
import { IsBoolean, IsNumber, IsObject, IsString } from 'class-validator';
import { Product_Type } from 'src/modules/product_type/model/product_type.model';

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
  @ApiProperty()
  @IsObject()
  product_type_id: Product_Type;
}
export class PropertyNameStatusResponse {
  @ApiProperty()
  @IsBoolean()
  status: boolean;
}
