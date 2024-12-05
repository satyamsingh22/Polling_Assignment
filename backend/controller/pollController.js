import { sendVoteToKafka } from '../kafka/kafkaProducer.js';
import Poll from '../model/poll.js';

export const createPoll = async (req, res) => {
  try {
    const { title, options } = req.body;

    if (!title || !Array.isArray(options) || options.length < 2) {
      return res.status(400).json({ error: 'Title and at least two options are required' });
    }

    const poll = await Poll.create({ title, options, votes: {} });
    res.status(201).json(poll);  // Respond with the created poll

  } catch (error) {
    console.error('Error creating poll:', error);
    res.status(500).json({ error: 'Failed to create poll' });
  }
};
  

export const votePoll = async (req, res) => {
  try {
    const { id } = req.params;
    const { option } = req.body;

    // Check if the poll exists
    const poll = await Poll.findByPk(id);
    if (!poll) {
      return res.status(404).json({ error: 'Poll not found' });
    }

    // Ensure the option is valid
    if (!poll.options.includes(option)) {
      return res.status(400).json({ error: 'Invalid poll option' });
    }

    // Send vote to Kafka
    await sendVoteToKafka(id, option);

    res.status(200).json({ message: 'Vote sent for processing' });
  } catch (error) {
    console.error('Failed to process vote:', error);
    res.status(500).json({ error: 'Failed to process vote' });
  }
};


export const getPollResults = async (req, res) => {
  try {
    const { id } = req.params;
    const poll = await Poll.findByPk(id);

    if (!poll) return res.status(404).json({ error: 'Poll not found' });

    res.json(poll.votes);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch poll results' });
  }
};
