import { ApiProperty } from '@nestjs/swagger';
import { IsString } from 'class-validator';
import { IsArray } from 'sequelize-typescript';

export class LoginDTO {
  @ApiProperty()
  @IsString()
  email: string;
  @ApiProperty()
  @IsString()
  password: string;
}
