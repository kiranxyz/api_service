//import { createApp } from './index';
import mongoose from 'mongoose';
import http from 'http';
import { Server } from 'socket.io';
import registerBattleSocket from './sockets/battleSocket';

const MONGO_URI = process.env.MONGO_URI || 'mongodb://localhost:27017/pokemon';
const PORT = Number(process.env.PORT || 8000);

async function main() {
  await mongoose.connect(MONGO_URI);
  console.log('Connected to MongoDB');

  //const app = createApp();
  //const server = http.createServer(app);

  /*const io = new Server(server, {
    cors: { origin: true }
  });

  registerBattleSocket(io);

  server.listen(PORT, () => console.log(`Server listening on http://localhost:${PORT}`));
}

main().catch(err => {
  console.error(err);
  process.exit(1);
});*/
}
