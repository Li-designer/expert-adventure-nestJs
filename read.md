## 环境变量设置
- [文档](https://docs.nestjs.cn/8/techniques?id=%e9%85%8d%e7%bd%ae)
1. 安装
   
   ```shell
   $ npm i --save @nestjs/config
   ```
2. `app.module`引入
   - --
   ```ts
   import { ConfigModule } from '@nestjs/config';

    @Module({
      imports: [ConfigModule.forRoot({
         envFilePath: ['.env.development', '.env.production'],
         isGlobal: true, // 在全局使用环境变量
      })],
    })
   ```
3. 定义环境变量
   ```ts
    ENV="dev"
    MYSQL_HOST="localhost"
    MYSQL_PASSWORD="12345678"
   ```
4. 定义环境变量文件使用环境变量
    - --
   ```ts
   import { Module } from '@nestjs/common';
    import { TypeOrmModule } from '@nestjs/typeorm';
    import { AppController } from './app.controller';
    import { AppService } from './app.service';
    import { UserModule } from './user/user.module';
    import { AuthModule } from './auth/auth.module';
    import { MenuModule } from './menu/menu.module';
    import { RoleModule } from './role/role.module';
    import { ConfigModule } from '@nestjs/config';
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
      providers: [AppService],
    })
    export class AppModule {}
   ```