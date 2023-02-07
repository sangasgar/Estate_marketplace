import { IsEmail, IsObject, IsString } from 'class-validator';

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
export class UpdateUsername {
  @IsObject()
  user: {
    username?: string;
    phone?: string;
    password?: string;
  };
}
