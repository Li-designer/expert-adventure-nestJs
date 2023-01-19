import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UserModule } from './user/user.module';
import { AuthModule } from './auth/auth.module';

@Module({
  imports: [
    // 数据库连接
    TypeOrmModule.forRoot({
      type: 'mysql',
      host: 'localhost', // 远程
      port: 3306,
      username: 'root',
      password: '12345678',
      database: 'expert_adventure',
      autoLoadEntities: true,
      synchronize: true, //实体与数据表进行对应,不创建数据库也会自动生成
    }),
    UserModule,
    AuthModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}