import { ApiProperty } from '@nestjs/swagger';
// * npm i --save class-validator class-transformer
import { IsNotEmpty } from 'class-validator';

export class CreateButtonDto {
  @ApiProperty({ example: 33 })
  @IsNotEmpty()
  btnId?: number;

  @ApiProperty({ example: 'btn_edit' })
  @IsNotEmpty()
  btnPer: string;

  @ApiProperty({ example: '编辑' })
  @IsNotEmpty()
  btnName: string;
}
