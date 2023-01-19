import { ApiProperty } from '@nestjs/swagger';
// * npm i --save class-validator class-transformer
import { IsNotEmpty } from 'class-validator';
export class CreateUserDto {
  @ApiProperty({ example: 33 })
  @IsNotEmpty()
  id?: number;

  @ApiProperty({ example: 'cookie' })
  @IsNotEmpty()
  username: string;

  @ApiProperty({ example: '123456' })
  @IsNotEmpty()
  password: string;
}
