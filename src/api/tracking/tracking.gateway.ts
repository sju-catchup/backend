import { WebSocketGateway, WebSocketServer } from '@nestjs/websockets';
import { Server } from 'socket.io';
import { TrackingEntity } from './tracking.entity';

@WebSocketGateway(3000, {
  cors: {
    origin: '*',
  },
})
export class TrackingGateway {
  @WebSocketServer()
  server: Server;

  async emitTrackingResultEvent(Tracking: TrackingEntity): Promise<void> {
    this.server.emit('Tracking_Result', { Tracking });
    return;
  }
}
