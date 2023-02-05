import { Injectable } from '@nestjs/common';
import { UserService } from '@/user/user.service';
import { JwtService } from '@nestjs/jwt';
import { User } from '@/type/auth';
import * as dayjs from 'dayjs';
@Injectable()
export class AuthService {
  constructor(
    private readonly UserService: UserService,
    private readonly jwtService: JwtService,
  ) {}

  /**
   * @本地身份策略调用方法
   * @调用UserService里面的findUserName方法通过username找到用户
   * @param username
   * @param password
   */
  async validateUser(username: string, password: string): Promise<any> {
    console.log(username, 'username');
    const user = await this.UserService.findUserName(username);
    console.log(user, 'user');

    if (Object.keys(user).length > 0 && user.password === password) {
      return user;
    }
    return null;
  }

  /**
   * @jwt认证登录
   * @param user
   */
  async login(user: User) {
    const res = await this.UserService.findUserName(user.username, user.role);
    const payload = { username: user.username, sub: res.id };
    // token过期时间
    const time = new Date();
    const end = time.setTime(time.getTime() + 3600 * 1000 * 24 * 7);
    const expires = dayjs(end).format('YYYY/MM/DD HH:mm:ss');
    // 3600 * 24 * 7
    return {
      id: res.id,
      username: user.username,
      roles: res.roles,
      roleNames: res.roleNames,
      accessToken: this.jwtService.sign(payload),
      expires: expires,
    };
  }

  /**
   * @token验证方法
   * @param token
   */
  async verifyToken(token: string): Promise<any> {
    try {
      if (!token) return false;
      const id = this.jwtService.verify(token.replace('Bearer ', ''));
      return id;
    } catch (e) {
      return false;
    }
  }
}
