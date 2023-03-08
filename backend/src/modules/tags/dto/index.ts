import { ApiProperty } from '@nestjs/swagger';
import { IsNumber, IsString } from 'class-validator';

export class TagDTO {
  @ApiProperty()
  @IsString()
  tag_name: string;
}
export class TagUpdateDTO {
  @ApiProperty()
  @IsNumber()
  id: number;
  @ApiProperty()
  @IsString()
  tag_name: string;
}
export class TagDeleteDTO {
  @ApiProperty()
  @IsNumber()
  id: number;
}
