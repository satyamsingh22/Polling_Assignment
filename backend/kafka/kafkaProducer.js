import { producer } from './kafka.js';

export const sendVoteToKafka = async (pollId, option) => {
  try {
    // Connect to Kafka producer
    await producer.connect();

    // Create the message to be sent
    const message = {
      pollId,
      option,
    };

    // Send message to Kafka topic 'votes'
    await producer.send({
      topic: 'votes',  // Ensure this is the correct Kafka topic
      messages: [
        {
          value: JSON.stringify(message),  // Send the message as a stringified JSON
        },
      ],
    });

    console.log(`Vote for poll ${pollId} sent to Kafka`);

  } catch (error) {
    console.error('Failed to send vote to Kafka:', error);
  } finally {
    // Disconnect after sending the message
    await producer.disconnect();
  }
};
