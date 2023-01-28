import { Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { User } from './entities/user.entity';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { Page, Response } from '@/type/user';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User)
    private readonly usersRepository: Repository<User>,
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
   *
   * @param username
   */
  async findUserName(username: string) {
    return this.usersRepository.find({ where: { username } });
  }

  async userfindOne(id: number) {
    const res = await this.usersRepository.find({
      where: { id },
      // relations: ['role'],
    });
    const value = { ...res[0] };
    // 浅拷贝一份
    // const value2 = Object.assign(value, { ...value.role });
    // delete value2.role;
    return {
      code: 200,
      // data: { ...value2, role: value2.typeId },
      data: { ...value },
    };
  }

  async updateUser(id: number, updateUserDto: UpdateUserDto) {
    return await this.usersRepository.update(id, { ...updateUserDto });
  }

  async remove(id: number) {
    await this.usersRepository.delete(id);
    return id;
  }
}
