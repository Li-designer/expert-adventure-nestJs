import { ApiProperty } from '@nestjs/swagger';
// * npm i --save class-validator class-transformer
import { IsNotEmpty } from 'class-validator';
export class CreateWsDto {
  @ApiProperty({ example: 33 })
  @IsNotEmpty()
  id?: number;

  @ApiProperty({ example: 'cookie' })
  @IsNotEmpty()
  username: string;

  @ApiProperty({ example: 'cookie' })
  @IsNotEmpty()
  createTime: string;

  @ApiProperty({ example: 'cookie' })
  @IsNotEmpty()
  message: string;

}
