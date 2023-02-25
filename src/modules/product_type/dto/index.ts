import { ApiProperty } from '@nestjs/swagger';
import { IsBoolean, IsString } from 'class-validator';

export class ProductTypeDTO {
  @ApiProperty()
  @IsString()
  product_type_name: string;
}
export class ProductTypeUpdateDTO {
  @ApiProperty()
  @IsString()
  id: number;
  @ApiProperty()
  @IsString()
  product_type_name: string;
}
export class ProductTypeStatusDTO {
  @ApiProperty()
  @IsBoolean()
  status: boolean;
}
