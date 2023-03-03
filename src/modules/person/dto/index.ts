import { ApiProperty } from '@nestjs/swagger';
export class PersonDTO {
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
