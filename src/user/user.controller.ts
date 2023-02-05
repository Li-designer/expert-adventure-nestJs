import { Controller, Get, Post, Body, Query } from '@nestjs/common';
import { UserService } from './user.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { ApiTags } from '@nestjs/swagger';
import { Page } from '@/type/user';

@ApiTags('用户增删改查')
@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}
  @Post('addUser')
  create(@Body() createUserDto: CreateUserDto) {
    return this.userService.create(createUserDto);
  }

  @Get('all')
  findAll(@Query() query: Page) {
    return this.userService.findAll(query);
  }

  @Get('selectId')
  /**
   * 参数查询
   * @Query id
   */
  async findOne(@Query('id') id: string) {
    // +id转换成number
    return this.userService.userfindOne(+id);
  }

  @Get('userRoles')
  async getUserOne(@Query('id') id: string) {
    // +id转换成number
    const res = await this.userService.getUserOne(+id);
    return {
      id: res.id,
      username: res.username,
      roles: res.roles,
    };
  }
  /**
   * @修改用户角色
   * @param id
   * @param roles
   * @returns
   */
  @Post('updateRoles')
  updateUserRoles(@Body('id') id: number, @Body('roles') roles: Array<number>) {
    return this.userService.updateUserRoles(+id, roles);
  }

  /**
   * @修改用户信息
   * @param updateUserDto
   * @returns
   */
  @Post('updateId')
  update(@Body() updateUserDto: UpdateUserDto) {
    return this.userService.updateUser(+updateUserDto.id, updateUserDto);
  }

  /**
   * @删除用户
   * @param id
   * @param roles
   * @returns
   */
  @Post('deleteId')
  remove(@Body('id') id: number, @Body('roles') roles: Array<number>) {
    return this.userService.remove(id, roles);
  }
}
