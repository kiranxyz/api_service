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
  userId: z.string().nonempty(),
  name: z.string().min(1),
  type: z.string().min(1),
  height: z.number().min(1),
  weight: z.number().min(1),
  stats: z.number().min(0),
  hp: z.number().min(0),
  attack: z.number().min(0),
  defense: z.number().min(0),
  specialattack: z.number().min(0),
  specialdefense: z.number().min(0),
  speed: z.number().min(0),
  abilities: z.string().min(0),
  overgrow: z.string().min(0),
  chlorophyll: z.string().min(0)
});

export const userIdParamSchemaZod = z.object({
  userId: z.string().nonempty()
});
