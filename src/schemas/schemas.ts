import { loadEnvFile } from 'process';
import { z } from 'zod/v4';

export const startBattleSchemaZod = z.object({
  player1: z.string().min(1),
  player2: z.string().min(1)
});
export const playTurnSchemaZod = z.object({
  player1Attack: z.number().min(0),
  player2Attack: z.number().min(0)
});
