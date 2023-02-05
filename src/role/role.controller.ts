import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Query,
} from '@nestjs/common';
import { RoleService } from './role.service';
import { CreateRoleDto } from './dto/create-role.dto';
import { UpdateRoleDto } from './dto/update-role.dto';

export type MenuObj = {
  menuArr: Array<number>;
  roleId: number;
};
@Controller('role')
export class RoleController {
  constructor(private readonly roleService: RoleService) {}

  @Post('addRole')
  create(@Body() createRoleDto: CreateRoleDto) {
    return this.roleService.create(createRoleDto);
  }

  @Get('roleList')
  findAll() {
    return this.roleService.findAll();
  }
  /**
   * @ManyToMany 关联查询角色查询关联菜单
   * @param roleId
   * @returns
   */
  @Get('getRoleMenuOne')
  async findOne(@Query('roleId') roleId: number) {
    return await this.roleService.getMenuOne(+roleId);
  }

  /**
   * @ManyToMany 角色关联菜单更新
   * @param roleId
   * @param keys
   * @returns
   */
  @Post('updateMenuKeys')
  update(@Body('roleId') roleId: number, @Body('keys') keys: Array<number>) {
    return this.roleService.updateMenuKeys(+roleId, keys);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.roleService.remove(+id);
  }
}
