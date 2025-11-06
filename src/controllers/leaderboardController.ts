import { type RequestHandler } from 'express';
import * as leaderboardService from '../services/leaderboardService.ts';

export const getLeaderboard: RequestHandler = async (_req, res) => {
  try {
    const leaderboard = await leaderboardService.getTopScores(20);
    res.status(200).json({ leaderboard });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Failed to fetch leaderboard' });
  }
};

export const addLeaderboardEntry: RequestHandler = async (req, res) => {
  try {
    const { userId, username, score, wins, losses } = req.body;

    if (!userId || !username || score == null) {
      return res.status(400).json({ error: 'Missing userId, username or score' });
    }

    const entry = await leaderboardService.addScore(userId, username, score, wins, losses);
    res.status(201).json({ message: 'Leaderboard updated', entry });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Failed to add leaderboard entry' });
  }
};
