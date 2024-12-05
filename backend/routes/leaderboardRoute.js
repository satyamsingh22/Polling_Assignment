import express from 'express';
import { getLeaderboard } from '../controller/leaderBoardController.js';

const leaderBoardrouter = express.Router();

leaderBoardrouter.get('/leaderboard', getLeaderboard);

export default leaderBoardrouter;
