import { Server, Socket } from 'socket.io';
import * as battleService from '../services/battleService';

export default function registerBattleSocket(io: Server) {
  io.of('/battle').on('connection', (socket: Socket) => {
    console.log('[socket] connected', socket.id);

    socket.on('join', async (payload: { battleId: string }) => {
      try {
        const { battleId } = payload;
        socket.join(battleId);
        const battle = await battleService.getBattle(battleId);
        socket.emit('battle:state', battle);
      } catch (e) {
        socket.emit('error', { message: (e as Error).message });
      }
    });

    socket.on('battle:move', async (payload: { battleId: string; side: 'player' | 'enemy'; moveName: string }) => {
      const { battleId, side, moveName } = payload;
      try {
        const battle = await battleService.performMove(battleId, side, moveName);
        io.of('/battle').to(battleId).emit('battle:state', battle);
      } catch (e) {
        socket.emit('error', { message: (e as Error).message });
      }
    });

    socket.on('disconnect', () => {
      console.log('[socket] disconnected', socket.id);
    });
  });
}
