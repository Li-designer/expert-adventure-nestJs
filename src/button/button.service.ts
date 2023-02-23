import { Injectable } from '@nestjs/common';
import { Repository } from 'typeorm';
import { CreateButtonDto } from './dto/create-button.dto';
import { UpdateButtonDto } from './dto/update-button.dto';
import { Button } from './entities/button.entity';
import { MenuService } from '@/menu/menu.service';
import { InjectRepository } from '@nestjs/typeorm';
import { Menu } from '@/menu/entities/menu.entity';

@Injectable()
export class ButtonService {
  constructor(
    @InjectRepository(Button)
    private readonly buttonRepository: Repository<Button>,
    private readonly MenuService: MenuService,
  ) { }
  async create(createButtonDto: CreateButtonDto) {
    return await this.buttonRepository.save(createButtonDto);
  }

  // 获取所有按钮权限
  async findAll() {
    const res = await this.buttonRepository.find({ relations: ['menus'] });
    return res;
  }

  /**
   * @关联查询按钮权限查询关联菜单
   * @param btnId
   * @returns 关联菜单
   */
  async getMenuOne(btnId: number) {
    const btnMenus = await this.buttonRepository
      .createQueryBuilder('button')
      .leftJoinAndSelect('button.menus', 'menu')
      .where('Button.btnId = :btnId', { btnId })
      .getOne();
    return btnMenus;
  }

  /**
   * @按钮权限关联菜单更新
   * @param btnId
   * @param menuId
   * @returns
   */

  async updateMenuKeys(btnId: number, menuId: number) {
    await this.buttonRepository
      .createQueryBuilder('button')
      .relation(Menu, 'buttons')
      .of(menuId)
      .add(btnId);
  }

  findOne(id: number) {
    return `This action returns a #${id} button`;
  }

  async update(id: number, updateButtonDto: UpdateButtonDto) {
    return await this.buttonRepository.update(id, { ...updateButtonDto });
  }

  async remove(btnId: number) {
    return await this.buttonRepository.delete(btnId);
  }
}
