import { ApiProperty } from '@nestjs/swagger';
import { IsString } from 'class-validator';

class UserResponce {
  @ApiProperty()
  @IsString()
  email: string;
  @ApiProperty()
  @IsString()
  phone: string;
}

export class AuthResponce {
  @ApiProperty()
  user: UserResponce;
  @ApiProperty()
  @IsString()
  token: string;
  @ApiProperty()
  @IsString()
  refresh_token: string;
}
export class RefreshResponce {
  @ApiProperty()
  @IsString()
  token: string;
  @ApiProperty()
  @IsString()
  refresh_token: string;
}
export class UpdateUserResponce {
  @ApiProperty()
  @IsString()
  email: string;
  @ApiProperty()
  @IsString()
  phone: string;
}
