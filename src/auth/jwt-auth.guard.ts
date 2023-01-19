import {
  ExecutionContext,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { AuthService } from '@/auth/auth.service';
import { UserService } from '@/user/user.service';
import { NestExpressApplication } from '@nestjs/platform-express';
import { AppModule } from '@/app.module';
import { NestFactory } from '@nestjs/core';
/**
 * @guard文件作用:守卫
 */

@Injectable()
export class JwtAuthGuard extends AuthGuard('jwt') {
  constructor() {
    // private readonly userService: UserService, // private readonly authService: AuthService,
    super();
  }

  async canActivate(context: ExecutionContext): Promise<boolean> {
    console.log('进入全局守卫');
    const req = context.switchToHttp().getRequest();
    // const res = context.switchToHttp().getResponse();
    /**
     * @如果白名单数组中存在路径
     */

    if (JwtAuthGuard.hasUrl(this.urlList, req.url)) return true;

    try {
      // 获取token
      const accessToken = req.get('Authorization');
      if (!accessToken) throw new UnauthorizedException('请先登录');
      // 获取id
      // @ts-ignore
      const app = await NestFactory.create<NestExpressApplication>(AppModule, {
        logger: true,
      });
      const authService = app.get(AuthService);
      const userService = app.get(UserService);
      const user = await authService.verifyToken(accessToken);
      // console.log(222222222, user);
      if (Object.keys(user).length > 0) {
        const resData = await userService.userfindOne(user.sub);
        if (resData.code === 200) return true;
      }
    } catch (e) {
      console.log(e);
      return false;
    }
  }
  // 白名单数组
  private urlList: string[] = [
    '/expert-adventure/auth/login',
    '/expert-adventure/',
  ];

  // 验证该次请求是否为白名单内的路由
  private static hasUrl(urlList: string[], url: string): boolean {
    let flag = false;
    if (urlList.indexOf(url) !== -1) {
      flag = true;
    }
    console.log('flag', flag);

    return flag;
  }
}
