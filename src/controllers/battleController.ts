import { type Request, type Response, type RequestHandler } from 'express';
import * as battleService from '../services/battleService.ts';
import { type StartBattleInput } from '#schemas';

export const startBattle: RequestHandler = async (req: Request, res: Response) => {
  try {
    const { playerPokemonId, enemyPokemonId } = req.body as StartBattleInput;

    if (!playerPokemonId || !enemyPokemonId) {
      return res.status(400).json({ error: 'Missing playerPokemonId or enemyPokemonId' });
    }

    const battle = await battleService.createBattle(playerPokemonId, enemyPokemonId);
    return res.status(201).json(battle);
  } catch (err) {
    const errorMessage = err instanceof Error ? err.message : 'Unknown error';
    return res.status(500).json({ error: errorMessage });
  }
};

export const getBattle: RequestHandler = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    if (!id) {
      return res.status(400).json({ error: 'Battle ID is required' });
    }
    const battle = await battleService.getBattle(id);

    if (!battle) {
      return res.status(404).json({ error: 'Battle not found' });
    }

    return res.status(200).json(battle);
  } catch (err) {
    const errorMessage = err instanceof Error ? err.message : 'Unknown error';
    return res.status(500).json({ error: errorMessage });
  }
};

export const performMove: RequestHandler = async (req, res) => {
  try {
    const { battleId, side, moveName } = req.body;
    if (!battleId || !side || !moveName) {
      return res.status(400).json({ error: 'Missing parameters' });
    }
    const updatedBattle = await battleService.performMove(battleId, side, moveName);
    console.log(updatedBattle);
    return res.status(200).json(updatedBattle);
  } catch (err: any) {
    return res.status(500).json({ error: err.message });
  }
};
