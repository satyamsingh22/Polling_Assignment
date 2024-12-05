import { Kafka, Partitioners } from 'kafkajs';

// Create a new Kafka instance
const kafka = new Kafka({
  clientId: 'polling-app',
  brokers: ['localhost:9092'], // Replace with your broker's address if needed
});

// Set up the producer to send messages
export const producer = kafka.producer({
  createPartitioner: Partitioners.LegacyPartitioner,  // Retain partitioner behavior
});

// Set up the consumer to receive messages
export const consumer = kafka.consumer({ groupId: 'polling-group' });

export default kafka;
