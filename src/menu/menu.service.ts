import { Injectable } from '@nestjs/common';
import { CreateMenuDto } from './dto/create-menu.dto';
import { UpdateMenuDto } from './dto/update-menu.dto';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { Menu } from './entities/menu.entity';

@Injectable()
export class MenuService {
  constructor(
    @InjectRepository(Menu)
    private readonly menuRepository: Repository<Menu>,
  ) {}
  async create(createMenuDto: CreateMenuDto) {
    return await this.menuRepository.save(createMenuDto);
  }

  async findAll() {
    const res = await this.menuRepository.find();
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
            parentKey: item.parentKey,
            key: item.key,
            path: item.path,
            component: item.component,
            meta: {
              icon: item.icon,
              rank: item.rank,
              title: item.title,
            },
            children: [],
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
          parentKey: item.parentKey,
          key: item.key,
          path: item.path,
          meta: {
            icon: item.icon,
            rank: item.rank,
            title: item.title,
          },
          children: [],
        });
      }

      //  默认curr为[],生成数组格式
      if (!curr.length) {
        // debugger
        curr.push({
          parentKey: item.parentKey,
          key: item.key,
          path: item.path,
          meta: {
            icon: item.icon,
            rank: item.rank,
            title: item.title,
          },
          children: [],
        });
      }
      return curr;
    }, []);
    return _list;
  }

  findOne(id: number) {
    return `This action returns a #${id} menu`;
  }

  update(id: number, updateMenuDto: UpdateMenuDto) {
    return `This action updates a #${id} menu`;
  }

  remove(id: number) {
    return `This action removes a #${id} menu`;
  }
}
