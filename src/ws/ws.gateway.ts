/* eslint-disable prettier/prettier */
import { ConnectedSocket, MessageBody, SubscribeMessage, WebSocketGateway } from "@nestjs/websockets";
import * as WebSocket from 'ws';
import { WsService } from "./ws.service";
@WebSocketGateway(3002)
export class WsStartGateway {
  constructor(private readonly wsService: WsService) { }
  @SubscribeMessage('hello')
  async hello(@MessageBody() data: any) {
    // 收到消息先储存存起来再全部发出去
    // const res = await this.wsService.create(data);
    console.log(data);
    return {
      "event": "hello",
      "data": data,
      "msg": "收到消息!"
    };
  }

  @SubscribeMessage('hello2')
  hello2(@MessageBody() data: any, @ConnectedSocket() client: WebSocket): any {
    // console.log('收到消息 client:', client);
    console.log('====================================');
    console.log(WsService, 'element');
    console.log('====================================');

    client.send(JSON.stringify({ event: 'tmp', data: '这里是个临时信息rustfisher.com' }));
    return { event: 'hello2', data: data };
  }
}