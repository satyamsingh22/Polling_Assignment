import {Server} from "socket.io"
import Poll from "../model/poll.js"; 

export const initializeWebSocket = (httpServer) => {
  const io = new Server(httpServer, { cors: { origin: '*' } });
  global.io = io; // Expose to global scope for use in controllers

  io.on('connection', (socket) => {
    console.log('Client connected:', socket.id);

    socket.on('join-poll', async (pollId) => {
      socket.join(pollId);
      const poll = await Poll.findByPk(pollId);
      if (poll) {
        socket.emit('poll-data', poll.votes);
      }
    });

    socket.on('disconnect', () => {
      console.log('Client disconnected:', socket.id);
    });
  });

  return io;
};
