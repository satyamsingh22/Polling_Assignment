import { producer } from "./kafka.js";
// Function to send a vote to Kafka
export const sendVoteToKafka = async (pollId, option) => {
  try {
    await producer.connect(); // Ensure producer is connected
    await producer.send({
      topic: 'votes',
      messages: [
        {
          value: JSON.stringify({ pollId, option }), // Send poll ID and option as message
        },
      ],
    });
    console.log(`Vote for poll ${pollId} sent to Kafka`);
  } catch (error) {
    console.error('Failed to send vote to Kafka:', error);
  } finally {
    await producer.disconnect(); // Clean up producer connection
  }
};
