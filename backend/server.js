import express from 'express';
import http from 'http';

import sequelize from './db/db.js';
import { initializeWebSocket } from './socket/socket.js';
import pollrouter from "../backend/routes/pollRoute.js"
import leaderBoardrouter from "./routes/leaderboardRoute.js"
import {processVotes} from "./kafka/kafkaConsumer.js"

const app = express();
const server = http.createServer(app);
initializeWebSocket(server);

app.use(express.json());
app.use('/api/v1/poll', pollrouter);
app.use('/api/v1/leaderboard',leaderBoardrouter);

sequelize.sync().then(() => {
  console.log('Database connected');
  server.listen(3000, () => console.log('Server running on port 3000'));
  processVotes();
});
