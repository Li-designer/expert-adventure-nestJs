import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UserModule } from './user/user.module';
import { AuthModule } from './auth/auth.module';
import { MenuModule } from './menu/menu.module';
import { RoleModule } from './role/role.module';
import { ConfigModule } from '@nestjs/config';
import { WsStartGateway } from './ws/ws.gateway';
@Module({
  imports: [
    //  环境变量设置
    ConfigModule.forRoot({
      envFilePath: ['.env.development', '.env.production'],
      isGlobal: true, // 在全局使用环境变量
    }),
    // 数据库连接
    TypeOrmModule.forRoot({
      type: 'mysql',
      host: process.env.MYSQL_HOST,
      port: 3306,
      username: 'root',
      password: process.env.MYSQL_PASSWORD,
      database: 'expert_adventure',
      autoLoadEntities: true,
      synchronize: true, //实体与数据表进行对应,不创建数据库也会自动生成
    }),
    UserModule,
    AuthModule,
    MenuModule,
    RoleModule,
  ],
  controllers: [AppController],
  providers: [AppService, WsStartGateway],
})
export class AppModule {}
