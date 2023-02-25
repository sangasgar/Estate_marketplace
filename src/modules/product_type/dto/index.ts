import { ApiProperty } from '@nestjs/swagger';
import { IsNumber, IsString } from 'class-validator';

export class ProductTypeDTO {
  @ApiProperty()
  @IsString()
  product_type_name: string;
}
export class ProductTypeUpdateDTO {
  @ApiProperty()
  @IsNumber()
  id: number;
  @ApiProperty()
  @IsString()
  product_type_name: string;
}
export class ProductTypeDeleteDTO {
  @ApiProperty()
  @IsNumber()
  id: number;
}
