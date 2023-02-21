import { ApiProperty } from '@nestjs/swagger';
import { IsNumber, IsObject } from 'class-validator';
class Person {
  @ApiProperty()
  @IsNumber()
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

class PersonUpdate {
  @ApiProperty()
  @IsNumber()
  user_id?: number;
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

export class PersonDTO {
  @ApiProperty()
  @IsObject()
  person?: Person;
}
export class PersonUpdateDTO {
  @ApiProperty()
  @IsObject()
  person: PersonUpdate;
}
