import { ApiProperty } from '@nestjs/swagger';
import { IsNumber, IsObject } from 'class-validator';
import { Users } from 'src/modules/user/models/user.model';

class Person {
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
  @IsNumber()
  user_id: number;
  @ApiProperty()
  @IsObject()
  person?: Person;
}
export class PersonUpdateDTO {
  @ApiProperty()
  user_id?: number;
  @ApiProperty()
  @IsObject()
  person: Person;
}
