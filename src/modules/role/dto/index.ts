import { ApiProperty } from '@nestjs/swagger';
import { IsNumber, IsString } from 'class-validator';

export class RoleDTO {
  @ApiProperty()
  @IsString()
  name: string;
}
export class RoleUpdateDTO {
  @ApiProperty()
  @IsNumber()
  id: number;
  @ApiProperty()
  @IsString()
  name: string;
}
export class RoleDeleteDTO {
  @ApiProperty()
  @IsNumber()
  id: number;
}
