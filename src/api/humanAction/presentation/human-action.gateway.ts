import { WebSocketGateway, WebSocketServer } from '@nestjs/websockets';
import { Server } from 'socket.io';
import { IHumanAction } from '../domain/human-action.interface';

@WebSocketGateway(3000, {
  cors: {
    origin: '*',
  },
})
export class HumanActionGateway {
  @WebSocketServer()
  server: Server;

  async emitNewHumanActionEvent(
    humanAction: IHumanAction | Promise<IHumanAction>,
  ): Promise<void> {
    this.server.emit('New_HumanAction', {
      HumanAction: await humanAction,
    });
    return;
  }
}
