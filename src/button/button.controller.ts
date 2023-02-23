import { Controller, Get, Post, Body, Query } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { ButtonService } from './button.service';
import { CreateButtonDto } from './dto/create-button.dto';
import { UpdateButtonDto } from './dto/update-button.dto';

@ApiTags('按钮权限增删改查')
@Controller('button')
export class ButtonController {
  constructor(private readonly buttonService: ButtonService) { }

  @Post('addBtnPremission')
  create(@Body() createButtonDto: CreateButtonDto) {
    return this.buttonService.create(createButtonDto);
  }

  @Get('btnList')
  findAll() {
    return this.buttonService.findAll();
  }

  /**
   * @关联查询按钮查询关联菜单
   * @param btnId
   * @returns
   */
  @Get('getButtonMenuOne')
  findOne(@Query('btnId') btnId: number) {
    return this.buttonService.getMenuOne(+btnId);
  }

  /**
   * 更新按钮权限列表
   * @param updateButtonDto
   * @returns
   */

  @Post('updateButtonList')
  updateButton(@Body() updateButtonDto: UpdateButtonDto) {
    return this.buttonService.update(+updateButtonDto.btnId, updateButtonDto);
  }

  /**
   * @按钮关联菜单更新
   * @param btnId
   * @param keys
   * @returns
   */
  @Post('updateMenuKeys')
  update(@Body('btnId') btnId: number, @Body('menuId') menuId: number) {
    return this.buttonService.updateMenuKeys(+btnId, +menuId);
  }

  @Post('deleteId')
  remove(@Body('btnId') btnId: number) {
    return this.buttonService.remove(+btnId);
  }
}
