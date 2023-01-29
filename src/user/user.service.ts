import { MenuService } from '@/menu/menu.service';
import { Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { User } from './entities/user.entity';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { Page, Response } from '@/type/user';
import { Role } from '@/type/menu';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User)
    private readonly usersRepository: Repository<User>,
    private readonly MenuService: MenuService,
  ) {}
  async create(CreateUserDto: CreateUserDto) {
    // try {
    return await this.usersRepository.save(CreateUserDto);
    //   return {
    //     code: 200,
    //     message: 'Success',
    //   };
    // } catch (e) {
    //   return {
    //     code: 400,
    //     message: e,
    //   };
    // }
  }
  // 查找所有用户
  async findAll(query: Page): Promise<Response> {
    /**
     * 一对多关联查询
     */
    try {
      const total = await this.usersRepository.find();
      const res = await this.usersRepository.find({
        relations: ['role'],
        order: {
          id: 'ASC',
        },
        skip: query.pageSize * (query.pageNum - 1),
        take: +query.pageSize,
        cache: true,
      });
      return {
        code: 200,
        data: {
          list: res,
          pageNum: +query.pageNum,
          pageSize: +query.pageSize,
          total: total.length,
        },
        message: 'Success',
      };
    } catch (e) {
      return {
        code: 400,
        message: e,
      };
    }
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

  async updateUser(id: number, updateUserDto: UpdateUserDto) {
    return await this.usersRepository.update(id, { ...updateUserDto });
  }

  async remove(id: number) {
    await this.usersRepository.delete(id);
    return id;
  }
}
