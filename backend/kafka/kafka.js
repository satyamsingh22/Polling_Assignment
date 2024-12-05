import { Kafka, Partitioners } from 'kafkajs';

const kafka = new Kafka({
  clientId: 'polling-app',
  brokers: ['localhost:9092'], // Change the broker to match your Kafka setup
});

export const producer = kafka.producer({
  createPartitioner: Partitioners.LegacyPartitioner, // Retain the partitioner behavior
});

export const consumer = kafka.consumer({ groupId: 'polling-group' });

export default kafka;
