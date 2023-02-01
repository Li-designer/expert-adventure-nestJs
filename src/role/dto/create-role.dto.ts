import { ApiProperty } from '@nestjs/swagger';
// * npm i --save class-validator class-transformer
import { IsNotEmpty } from 'class-validator';
export class CreateRoleDto {
  @ApiProperty({ example: 33 })
  @IsNotEmpty()
  roleId?: number;

  @ApiProperty({ example: 'cookie' })
  @IsNotEmpty()
  rolename: string;

  @ApiProperty({ example: '123456' })
  @IsNotEmpty()
  roleType: string;
}
