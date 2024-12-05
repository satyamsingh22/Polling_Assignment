export const getLeaderboard = async (req, res) => {
  try {
    const polls = await Poll.findAll();  // Fetch all polls
    const leaderboard = [];

    // Iterate over all polls and their options to build leaderboard
    polls.forEach((poll) => {
      for (const [option, votes] of Object.entries(poll.votes)) {
        leaderboard.push({ option, votes });
      }
    });

    // Sort leaderboard based on votes
    leaderboard.sort((a, b) => b.votes - a.votes);

    // Return the top 10 results
    res.json(leaderboard.slice(0, 10));
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch leaderboard' });
  }
};
