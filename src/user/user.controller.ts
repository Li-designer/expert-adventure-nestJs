import { Controller, Get, Post, Body, Query } from '@nestjs/common';
import { UserService } from './user.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { ApiTags } from '@nestjs/swagger';
import { Page, Response } from '@/type/user';

@ApiTags('用户增删改查')
@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}
  @Post('addUser')
  create(@Body() createUserDto: CreateUserDto) {
    return this.userService.create(createUserDto);
  }

  @Get('all')
  findAll(@Query() query: Page): Promise<Response> {
    return this.userService.findAll(query);
  }

  @Get('selectId')
  /**
   * 参数查询
   * @Query id
   */
  findOne(@Query('id') id: string) {
    // +id转换成number
    return this.userService.userfindOne(+id);
  }

  @Post('updateId')
  update(@Body() updateUserDto: UpdateUserDto) {
    return this.userService.updateUser(+updateUserDto.id, updateUserDto);
  }

  @Post('deleteId')
  remove(@Body() updateUserDto: UpdateUserDto) {
    return this.userService.remove(+updateUserDto.id);
  }
}
