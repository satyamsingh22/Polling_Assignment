import { consumer } from './kafka.js';
import Poll from '../model/poll.js';  // Import Poll model to update vote counts

export const processVotes = async () => {
  // Connect the consumer to the Kafka broker
  await consumer.connect();
  await consumer.subscribe({ topic: 'votes', fromBeginning: true });  // Subscribe to the 'votes' topic

  // Run the consumer to process each incoming message
  consumer.run({
    eachMessage: async ({ message }) => {
      try {
        // Log the raw message received from Kafka for debugging
        console.log('Received Kafka message:', message.value.toString());

        // Parse the incoming message to JSON
        const { pollId, option } = JSON.parse(message.value.toString());

        // Validate if the pollId and option are correct
        if (!pollId || !option) {
          throw new Error('Invalid message format: pollId or option missing');
        }

        // Fetch the poll from the database using the pollId
        const poll = await Poll.findByPk(pollId);
        if (!poll) {
          console.error(`Poll with ID ${pollId} not found.`);
          return;
        }

        // Increment the vote for the selected option
        poll.votes[option] = (poll.votes[option] || 0) + 1;

        // Save the updated poll to the database
        await poll.save();

        console.log(`Vote processed for Poll ID: ${pollId}, Option: ${option}`);

      } catch (error) {
        console.error('Error processing vote:', error);
      }
    },
  });
};
