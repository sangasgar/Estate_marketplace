import { IsString } from 'class-validator';
import { IsArray } from 'sequelize-typescript';

export class LoginDTO {
  @IsString()
  email: string;
  @IsString()
  password: string;
}
