import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateRoleDto } from './dto/create-role.dto';
import { UpdateRoleDto } from './dto/update-role.dto';
import { Role } from './entities/role.entity';
import { MenuObj } from './role.controller';
import { Menu } from '@/menu/entities/menu.entity';
import { MenuService } from '@/menu/menu.service';

@Injectable()
export class RoleService {
  constructor(
    @InjectRepository(Role)
    private readonly rolesRepository: Repository<Role>,
    private readonly MenuService: MenuService,
  ) {}
  async create(createRoleDto: CreateRoleDto) {
    return await this.rolesRepository.save(createRoleDto);
  }
  // 查询所有角色
  async findAll() {
    const res = await this.rolesRepository.find();
    return res;
  }

  async findOne(roleId: number) {
    const res = await this.rolesRepository.find({ where: { roleId } });
    return res;
  }

  /**
   * @ManyToMany 关联查询角色查询关联菜单
   * @param roleId
   * @returns
   */
  async getMenuOne(roleId: number) {
    const roleMenus = await this.rolesRepository
      .createQueryBuilder('Role')
      .leftJoinAndSelect('Role.menuKeys', 'Menu')
      .where('Role.roleId = :roleId', { roleId })
      .getOne();
    return roleMenus;
  }

  /**
   * @ManyToMany 角色关联菜单更新
   * @param roleId
   * @param keys
   * @returns
   */
  async updateMenuKeys(roleId: number, keys: Array<number>) {
    const res = await this.getMenuOne(roleId);
    const keyArr = res.menuKeys.map((item) => {
      return +item.id;
    });
    if (keys && keys.length > 0 && keyArr.length < keys.length) {
      // 防止重复添加
      keys.forEach(async (item) => {
        // *没有添加
        if (keyArr.indexOf(+item) == -1) {
          await this.rolesRepository
            .createQueryBuilder()
            .relation(Role, 'menuKeys')
            .of(roleId)
            .add(+item);
        }
      });
    } else if (keys && keys.length > 0 && keyArr.length > keys.length) {
      // *删除多余的
      keyArr.forEach(async (item) => {
        if (keys.indexOf(+item) == -1) {
          await this.rolesRepository
            .createQueryBuilder()
            .relation(Role, 'menuKeys')
            .of(roleId)
            .remove(+item);
        }
      });
    }
    return;
  }

  remove(id: number) {
    return `This action removes a #${id} role`;
  }
}
