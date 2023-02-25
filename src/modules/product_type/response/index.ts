import { ApiProperty } from '@nestjs/swagger';
import { IsString } from 'class-validator';

export class Product_TypeResponse {
  @ApiProperty()
  @IsString()
  product_type_name: string;
}
