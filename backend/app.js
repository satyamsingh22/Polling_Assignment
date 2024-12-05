import http from 'http';
import { Server } from 'socket.io';
import Poll from './model/poll.js';
const server = http.createServer();
const io = new Server(server, { cors: { origin: '*' } });

io.on('connection', (socket) => {
  console.log('Client connected:', socket.id);

  socket.on('join-poll', async (pollId) => {
    socket.join(pollId);

    const poll = await Poll.findByPk(pollId);
    if (poll) {
      socket.emit('poll-data', poll.votes);
    }
  });

  socket.on('vote', async (data) => {
    const { pollId, option } = data;
    const poll = await Poll.findByPk(pollId);s

    if (poll) {
      poll.votes[option] = (poll.votes[option] || 0) + 1;
      await poll.save();
      io.to(pollId).emit('poll-update', poll.votes);
    }
  });

  socket.on('disconnect', () => {
    console.log('Client disconnected:', socket.id);
  });
});

server.listen(3001, () => {
  console.log('WebSocket server running on port 3001');
});

export default io;
