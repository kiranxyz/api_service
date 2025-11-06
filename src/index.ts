import cors from 'cors';
import express from 'express';
import '#db';
import { errorHandler } from '#middlewares';
import { battleRouter } from '#routes';
import pokemonRouter from '../src/routes/pokemonRouter.ts';
import leaderboardRouter from './routes/leaderboardRouter.ts';

const app = express();
const port = process.env.PORT || 8080;
app.use(
  cors({
    origin: 'http://localhost:5173',
    methods: ['GET', 'POST', 'PUT', 'DELETE']
  })
);

app.use(express.json());
app.use('/pokemon', pokemonRouter);
app.use('/api/battle', battleRouter);
app.use('/api/leaderboard', leaderboardRouter);

app.use('/*splat', (_req, res) => {
  res.status(404).json({ error: 'Not found' });
});

app.use(errorHandler);

app.listen(port, () => console.log(`Server listening on http://localhost:${port}`));
