import { Ws } from './entities/ws.entity';
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { WsController } from './ws.controller';
import { WsService } from './ws.service';

@Module({
  imports: [TypeOrmModule.forFeature([Ws])],
  controllers: [WsController],
  providers: [WsService],
  exports: [WsService], // 抛出在auth模块中引用
})
export class WsModule {}
