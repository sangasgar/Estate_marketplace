import { ApiProperty } from '@nestjs/swagger';
import { IsBoolean, IsString } from 'class-validator';

export class MediaTypeResponse {
  @ApiProperty()
  @IsString()
  media_type_name: string;
  @ApiProperty()
  @IsString()
  media_type_extension: string;
}

export class StatusMediaTypeResponse {
  @ApiProperty()
  @IsBoolean()
  status: boolean;
}
