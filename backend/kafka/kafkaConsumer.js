import Poll from '../model/poll.js';
import { consumer } from './kafka.js';
export const processVotes = async (io) => {
  await consumer.connect();
  await consumer.subscribe({ topic: 'votes', fromBeginning: true });

  consumer.run({
    eachMessage: async ({ message }) => {
      const { pollId, option } = JSON.parse(message.value.toString());
      const poll = await Poll.findByPk(pollId);

      if (poll) {
        poll.votes[option] = (poll.votes[option] || 0) + 1;
        await poll.save();
        io.to(pollId).emit('poll-update', poll.votes);
      }
    },
  });
};
