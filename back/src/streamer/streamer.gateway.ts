import { Logger } from '@nestjs/common';
import {
  WebSocketGateway,
  SubscribeMessage,
  MessageBody,
  OnGatewayInit,
  OnGatewayConnection,
  OnGatewayDisconnect,
  WebSocketServer,
  WsResponse,
} from '@nestjs/websockets';

import { Server } from 'ws';

import { Socket } from 'socket.io';

@WebSocketGateway({ cors: true, namespace: '/streamer' })
export class StreamerGateway
  implements OnGatewayInit, OnGatewayConnection, OnGatewayDisconnect
{
  private logger: Logger = new Logger(StreamerGateway.name);
  @WebSocketServer() server: Server;

  afterInit(server: Server): void {
    return this.logger.log('init');
  }

  handleDisconnect(client: Socket): void {
    return this.logger.log(`Client dis: ${client.id}`);
  }
  handleConnection(client: Socket) {
    return this.logger.log(`Client con: ${client.id}`);
  }
  public handleStatus(payload: any): Promise<WsResponse<any>> {
    this.logger.log(`change status: ${payload.room}, ${payload.status}`);
    return this.server.to(payload.room).emit('statusToClient', payload);
  }

  @SubscribeMessage('joinStatus')
  public joinStatus(client: Socket, room: string): void {
    this.logger.log(`joinStatus ${room}`);
    client.join(room);
  }
  @SubscribeMessage('leaveStatus')
  public leaveStatus(client: Socket, room: string): void {
    this.logger.log(`leaveStatus ${room}`);
    client.leave(room);
  }
}
