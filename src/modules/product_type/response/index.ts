import { ApiProperty } from '@nestjs/swagger';
import { IsBoolean, IsString } from 'class-validator';

export class Product_TypeResponse {
  @ApiProperty()
  @IsString()
  product_type_name: string;
}
export class Product_Type_Update_Response {
  @ApiProperty()
  @IsBoolean()
  status: boolean;
}
