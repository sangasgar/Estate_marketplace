import { ApiProperty } from '@nestjs/swagger';
import { IsNumber, IsObject } from 'class-validator';
export class PersonDTO {
  @ApiProperty()
  user_id: number;
  @ApiProperty()
  first_name?: string;
  @ApiProperty()
  last_name?: string;
  @ApiProperty()
  middle_name?: string;
  @ApiProperty()
  phone?: string;
  @ApiProperty()
  person_address?: string;
}

export class PersonUpdateDTO {
  @ApiProperty()
  user_id: number;
  @ApiProperty()
  first_name?: string;
  @ApiProperty()
  last_name?: string;
  @ApiProperty()
  middle_name?: string;
  @ApiProperty()
  phone?: string;
  @ApiProperty()
  person_address?: string;
}
