import { IsString, isString } from 'class-validator';

export class CreateUserDTO {
  @IsString()
  username: string;
  @IsString()
  email: string;
  @IsString()
  password: string;
  @IsString()
  phone: string;
}
