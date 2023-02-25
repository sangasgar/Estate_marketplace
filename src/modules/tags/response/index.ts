import { ApiProperty } from '@nestjs/swagger';
import { IsBoolean, IsString } from 'class-validator';

export class TagResponse {
  @ApiProperty()
  @IsString()
  tag_name: string;
  @ApiProperty()
  @IsString()
  slug: string;
}
export class TagUpdateResponse {
  @ApiProperty()
  @IsBoolean()
  status: boolean;
}
