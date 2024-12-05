import express from 'express';
import { createPoll, getPollResults, votePoll } from '../controller/pollController.js';

const pollrouter = express.Router();

pollrouter.post('/polls', createPoll);
pollrouter.post('/polls/:id/vote', votePoll);
pollrouter.get('/polls/:id', getPollResults);

export default pollrouter;
