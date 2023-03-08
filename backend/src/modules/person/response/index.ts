import { ApiProperty } from '@nestjs/swagger';
import { IsBoolean, IsObject, IsString } from 'class-validator';
import { Users } from 'src/modules/user/models/user.model';

export class PersonResponse {
  @ApiProperty()
  @IsString()
  first_name: string;
  @ApiProperty()
  @IsString()
  last_name: string;
  @ApiProperty()
  @IsString()
  middle_name: string;
  @ApiProperty()
  @IsString()
  phone: string;
  @ApiProperty()
  @IsString()
  person_address: string;
  @ApiProperty()
  @IsObject()
  user_id: Users;
}
export class PersonUpdateResponse {
  @ApiProperty()
  @IsBoolean()
  updateStatus: boolean;
}
