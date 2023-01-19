import { HttpAdapterHost, NestFactory } from '@nestjs/core';
import { NestExpressApplication } from '@nestjs/platform-express';
import { TransformInterceptor } from './common/interceptors/transform.interceptor';
import { AppModule } from './app.module';
import * as path from 'path';
import { generateDocument } from './doc';
import { AllExceptionsFilter } from './common/exception/http.exception.fillter';
import { JwtAuthGuard } from '@/auth/jwt-auth.guard';
declare const module: any;

async function bootstrap() {
  // @ts-ignore
  const app = await NestFactory.create<NestExpressApplication>(AppModule, {
    logger: true,
  });
  app.useStaticAssets(path.join(__dirname, '..', 'expert-adventure'));
  app.setBaseViewsDir(path.join(__dirname, '..', 'views'));
  app.setViewEngine('hbs');

  // 设置统一响应体格式
  app.useGlobalInterceptors(new TransformInterceptor());
  // 全局异常拦截
  app.useGlobalFilters(new AllExceptionsFilter());
  // swagger创建文档
  generateDocument(app);
  // 全局JWT认证设置
  app.useGlobalGuards(new JwtAuthGuard());
  // 设置统一的接口前缀
  app.setGlobalPrefix('/expert-adventure');

  await app.listen(3000);

  // 热更新设置
  if (module.hot) {
    module.hot.accept();
    module.hot.dispose(() => app.close());
  }
}
bootstrap();
