import { ApiProperty } from '@nestjs/swagger';
import { IsString } from 'class-validator';

class UserResoinse {
  @ApiProperty()
  @IsString()
  username: string;
  @ApiProperty()
  @IsString()
  email: string;
  @ApiProperty()
  @IsString()
  phone: string;
}

export class AuthResponce {
  @ApiProperty()
  user: UserResoinse;
  token: string;
}
export class UpdateUserResponce {
  @ApiProperty()
  @IsString()
  username: string;
  @ApiProperty()
  @IsString()
  email: string;
  @ApiProperty()
  @IsString()
  phone: string;
}
