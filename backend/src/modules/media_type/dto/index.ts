import { ApiProperty } from '@nestjs/swagger';
import { IsNumber, IsString } from 'class-validator';

export class MediaTypeDTO {
  @ApiProperty()
  @IsString()
  media_type_name: string;
  @ApiProperty()
  @IsString()
  media_type_extension: string;
}
export class MediaTypeUpdateDTO {
  @ApiProperty()
  @IsNumber()
  id: number;
  @ApiProperty()
  media_type_name?: string;
  @ApiProperty()
  media_type_extension?: string;
}
export class DeleteMediaTypeDTO {
  @ApiProperty()
  @IsNumber()
  id: number;
}
