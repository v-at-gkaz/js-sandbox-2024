import { IsString } from 'class-validator';
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';

export class CreateUserDto {
  @ApiProperty({
    description: 'Username',
  })
  @IsString()
  login: string;

  @ApiPropertyOptional({
    description: 'Optional field',
  })
  @IsString()
  descr?: string;

  @ApiProperty()
  @IsString()
  password: string;
}
