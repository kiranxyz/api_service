import { Router } from 'express';
import { getLeaderboard, addLeaderboardEntry } from '../controllers/leaderboardController.ts';
import { validateZod } from '#middlewares';
import { addLeaderboardEntrySchemaZod } from '#schemas';

const leaderboardRouter = Router();

leaderboardRouter.get('/', getLeaderboard);
leaderboardRouter.post('/', validateZod(addLeaderboardEntrySchemaZod), addLeaderboardEntry);

export default leaderboardRouter;
