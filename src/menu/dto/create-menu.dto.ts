import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty } from 'class-validator';
export class CreateUserDto {
  @ApiProperty({ example: 33 })
  @IsNotEmpty()
  id?: number;

  @ApiProperty({ example: 'cookie' })
  @IsNotEmpty()
  path: string;

  @ApiProperty({ example: '123456' })
  @IsNotEmpty()
  title: string;

  @ApiProperty({ example: '123456' })
  key?: string;

  @ApiProperty({ example: 12 })
  @IsNotEmpty()
  rank: number;

  @ApiProperty({ example: 'icon' })
  @IsNotEmpty()
  icon: number;

  @ApiProperty({ example: 'icon' })
  parentKey?: string;
}

export class CreateMenuDto {}