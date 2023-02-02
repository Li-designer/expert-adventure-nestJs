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
import { MenuService } from './menu.service';
import { CreateMenuDto } from './dto/create-menu.dto';
import { UpdateMenuDto } from './dto/update-menu.dto';
import { ApiTags } from '@nestjs/swagger';

@ApiTags('菜单增删改查')
@Controller('menu')
export class MenuController {
  constructor(private readonly menuService: MenuService) {}

  @Post('getMenuCreate')
  create(@Body() createMenuDto: CreateMenuDto) {
    return this.menuService.create(createMenuDto);
  }

  @Get('getMenuList')
  findAll() {
    return this.menuService.findAll();
  }

  @Get('menuDetail')
  findOne(@Query('id') id: number) {
    return this.menuService.findOne(+id);
  }

  @Get('getMenuChildren')
  findChildren(@Query('key') key: string) {
    return this.menuService.findChildren(key);
  }

  @Post('updateMenu')
  update(@Body('id') id: string, @Body() updateMenuDto: UpdateMenuDto) {
    return this.menuService.update(+id, updateMenuDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.menuService.remove(+id);
  }
}
