import Poll from "../model/poll.js";
export const getLeaderboard = async (req, res) => {
  try {
    const polls = await Poll.findAll();
    const leaderboard = [];

    polls.forEach((poll) => {
      for (const [option, votes] of Object.entries(poll.votes)) {
        leaderboard.push({ option, votes });
      }
    });

    leaderboard.sort((a, b) => b.votes - a.votes);
    res.json(leaderboard.slice(0, 10));
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch leaderboard' });
  }
};
