import { ApiProperty } from '@nestjs/swagger';
import { IsNumber, IsString } from 'class-validator';
import { RoleDTO } from '../dto';

export class RoleResponse {
  @ApiProperty()
  @IsNumber()
  id: number;
  @ApiProperty()
  @IsString()
  name: string;
}
export class ErrorResponse {
  @ApiProperty()
  @IsString()
  error: string;
}

export class RolesResponse {
  @ApiProperty()
  @IsString()
  roles: RoleDTO[];
}

export class UpdateResponse {
  @ApiProperty()
  @IsString()
  roles: RoleDTO[];
}
