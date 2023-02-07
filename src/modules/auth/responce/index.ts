import { IsString } from 'class-validator';

export class AuthResponce {
  @IsString()
  username: string;
  @IsString()
  email: string;
  @IsString()
  phone: string;
  @IsString()
  token: string;
}
export class UpdateUserResponce {
  @IsString()
  username: string;
  @IsString()
  email: string;
  @IsString()
  phone: string;
}