import { ApiProperty } from '@nestjs/swagger';
import { IsObject, IsString } from 'class-validator';

export class CreateUserDTO {
  @ApiProperty()
  @IsString()
  username: string;
  @ApiProperty()
  @IsString()
  email: string;
  @ApiProperty()
  @IsString()
  password: string;
}
export class UpdateUsername {
  @ApiProperty()
  @IsObject()
  user: {
    username?: string;
    phone?: string;
    password?: string;
  };
}
