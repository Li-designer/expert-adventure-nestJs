import { MenuService } from '@/menu/menu.service';
import { Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { User } from './entities/user.entity';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { Page } from '@/type/user';
import { Role } from '@/type/menu';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User)
    private readonly usersRepository: Repository<User>,
    private readonly MenuService: MenuService,
  ) {}
  async create(CreateUserDto: CreateUserDto) {
    return await this.usersRepository.save(CreateUserDto);
  }
  // 查找所有用户
  async findAll(query: Page) {
    /**
     * 多对多关联查询
     */
    const total = await this.usersRepository.find();
    const res = await this.usersRepository.find({
      relations: ['roles'],
      order: {
        id: 'ASC',
      },
      skip: query.pageSize * (query.pageNum - 1),
      take: +query.pageSize,
      cache: true,
    });
    return {
      list: res,
      pageNum: +query.pageNum,
      pageSize: +query.pageSize,
      total: total.length,
    };
  }

  /**
   * @jwt认证登录
   * @param username
   * @returns
   */
  async findUserName(username: string) {
    const res = await this.usersRepository.find({
      relations: ['roles'],
      where: { username },
    });
    const value = { ...res[0] };
    const resRole = await this.getRolesName(res[0]?.roles);
    delete value.roles;
    return {
      ...value,
      roles: resRole.role,
      roleNames: resRole.roleNames,
    };
  }

  async userfindOne(id: number) {
    const res = await this.usersRepository.find({
      where: { id },
      // relations: ['roles'],
    });

    // 浅拷贝一份
    // const value2 = Object.assign(value, { ...value.role });
    // delete value.roles;
    return {
      code: 200,
      data: { ...res[0] },
    };
  }

  getRolesName(roles: Role) {
    const roleNames =
      roles.map((item) => {
        return item.rolename;
      }) || [];
    const role =
      roles.map((item) => {
        return item.roleType;
      }) || [];
    return { role, roleNames };
  }

  /**
   * @多对多关联角色更新
   * @param id
   * @param roles
   */
  async updateUserRoles(id: number, roles: Array<number>) {
    const res = await this.getUserOne(id);
    const keyArr = res.roles.map((item) => {
      return +item.roleId;
    });
    if (roles && roles.length > 0 && keyArr.length < roles.length) {
      // 防止重复添加
      roles?.forEach(async (item) => {
        // *没有添加
        if (keyArr.indexOf(+item) == -1) {
          await this.usersRepository
            .createQueryBuilder()
            .relation(User, 'roles')
            .of(id)
            .add(+item);
        }
      });
    } else if (roles && roles.length > 0 && keyArr.length > roles.length) {
      // *删除多余的
      keyArr?.forEach(async (item) => {
        if (roles.indexOf(+item) == -1) {
          await this.usersRepository
            .createQueryBuilder()
            .relation(User, 'roles')
            .of(id)
            .remove(+item);
        }
      });
    }
    return;
  }

  /**
   * @多对多单个用户关联角色查询
   * @param id
   * @returns
   */
  async getUserOne(id: number) {
    const UserRole = await this.usersRepository
      .createQueryBuilder('User')
      .leftJoinAndSelect('User.roles', 'Role')
      .where('User.id = :id', { id })
      .getOne();
    return UserRole;
  }

  async updateUser(id: number, updateUserDto: UpdateUserDto) {
    return await this.usersRepository.update(id, { ...updateUserDto });
  }
  /**
   * @删除用户删除关联角色
   * @param id
   * @param roles
   * @returns
   */
  async remove(id: number, roles: Array<number>) {
    await this.usersRepository.delete(id);
    roles?.forEach(async (item) => {
      await this.usersRepository
        .createQueryBuilder()
        .relation(User, 'roles')
        .of(id)
        .remove(+item);
    });
    return '用户删除成功!';
  }
}
