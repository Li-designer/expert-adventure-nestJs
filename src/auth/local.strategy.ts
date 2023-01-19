import { Strategy } from 'passport-local';
import { PassportStrategy } from '@nestjs/passport';
import { Injectable, UnauthorizedException } from '@nestjs/common';
import { AuthService } from './auth.service';

/**
 * @两种策略模式:2.本地身份认证
 */

@Injectable()
export class LocalStrategy extends PassportStrategy(Strategy) {
  constructor(private readonly authService: AuthService) {
    super();
  }

  async validate(username: string, password: string): Promise<any> {
    console.log(username, 'username');

    const user = await this.authService.validateUser(username, password);
    // 找不到抛出异常
    if (!user) {
      throw new UnauthorizedException();
    }
    return user;
  }
}
