import Leaderboard from '../models/Leaderboard.ts';

export const getTopScores = async (limit = 10) => {
  return Leaderboard.find().sort({ score: -1 }).limit(limit).lean();
};

export const addScore = async (userId: string, username: string, score: number, wins = 0, losses = 0) => {
  const existing = await Leaderboard.findOne({ userId });

  if (existing) {
    existing.score = Math.max(existing.score, score);
    existing.wins += wins;
    existing.losses += losses;
    await existing.save();
    return existing;
  }

  const newEntry = await Leaderboard.create({ userId, username, score, wins, losses });
  return newEntry;
};
