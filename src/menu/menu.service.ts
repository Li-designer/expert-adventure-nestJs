import { Injectable } from '@nestjs/common';
import { CreateMenuDto } from './dto/create-menu.dto';
import { UpdateMenuDto } from './dto/update-menu.dto';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { Menu } from './entities/menu.entity';
import { Role } from '@/type/menu';

@Injectable()
export class MenuService {
  constructor(
    @InjectRepository(Menu)
    private readonly menuRepository: Repository<Menu>,
  ) {}
  async create(createMenuDto: CreateMenuDto) {
    return await this.menuRepository.save(createMenuDto);
  }

  /**
   * @不返回component 前端根据path跳转,path对应文件名
   * @返回component 前端根据component跳转,path可以随便写
   */

  async findAll() {
    const res = await this.menuRepository.find({ relations: ['roles'] });
    const _list = res.reduce((curr, item) => {
      //  如果有key相同放到一个children数组里面
      if (
        curr &&
        curr.length &&
        curr.findIndex((ite) => ite.key == item.parentKey) > -1
      ) {
        const index = curr.findIndex((it) => it.key == item.parentKey);
        if (index !== -1) {
          curr[index].children.push({
            id: item.id,
            parentKey: item.parentKey,
            key: item.key,
            name: item.name,
            path: item.path,
            component: item.component,
            meta: {
              icon: item.icon,
              rank: item.rank,
              title: item.title,
              roles: this.getRolesList(item.roles),
            },
            // ! 这里children为空会导致菜单不显示
            // children: [],
          });
        }
      }
      // key不同重新生成一个对象单独放到数组里面
      if (
        curr &&
        curr.length &&
        curr.findIndex((ite) => ite.key == item.parentKey) === -1
      ) {
        curr.push({
          id: item.id,
          parentKey: item.parentKey,
          key: item.key,
          name: item.name,
          path: item.path,
          component: item.component || undefined, // * 父component为undefind/Layout可以显示子页面
          meta: {
            icon: item.icon,
            rank: item.rank,
            title: item.title,
            roles: this.getRolesList(item.roles),
          },
          children: [],
        });
      }

      //  默认curr为[],生成数组格式
      if (!curr.length) {
        // debugger
        curr.push({
          id: item.id,
          parentKey: item.parentKey,
          key: item.key,
          path: item.path,
          name: item.name,
          component: item.component || undefined, // * 父component为undefind/Layout可以显示子页面
          meta: {
            icon: item.icon,
            rank: item.rank,
            title: item.title,
            roles: this.getRolesList(item.roles),
          },
          children: [],
        });
      }
      return curr;
    }, []);
    return _list;
  }

  getRolesList(roles: Role) {
    const res =
      roles.map((item) => {
        return item.roleType;
      }) || [];
    return res;
  }

  async findOne(id: number) {
    return await this.menuRepository.find({ where: { id } });
  }

  async update(id: number, updateMenuDto: UpdateMenuDto) {
    return await this.menuRepository.update(id, { ...updateMenuDto });
  }

  remove(id: number) {
    return `This action removes a #${id} menu`;
  }
}
