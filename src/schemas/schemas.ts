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

export const storePokemonSchemaZod = z.object({
  userId: z.string().nonempty('User ID is required'),
  id: z.number().int().min(1, 'Pokemon ID is required'),
  name: z.string().min(1, 'Name is required'),
  type: z.string().optional(),
  height: z.number().optional(),
  weight: z.number().optional(),
  stats: z.number().optional(),
  hp: z.number().optional(),
  attack: z.number().optional(),
  defense: z.number().optional(),
  specialattack: z.number().optional(),
  specialdefense: z.number().optional(),
  speed: z.number().optional(),
  abilities: z.array(z.string()).optional(),
  overgrow: z.string().optional(),
  chlorophyll: z.string().optional()
});

export const userIdParamSchemaZod = z.object({
  userId: z.string().nonempty('User ID is required')
});
