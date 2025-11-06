import { loadEnvFile } from 'process';
import { z } from 'zod/v4';

export const startBattleSchemaZod = z.object({
  playerPokemonId: z.string().nonempty(),
  enemyPokemonId: z.string().nonempty()
});
export const playTurnSchemaZod = z.object({
  player1Attack: z.number().min(0),
  player2Attack: z.number().min(0)
});

export const moveSchemaZod = z.object({
  name: z.string().min(1, 'Move name is required'),
  power: z.number().min(1, 'Move power must be at least 1'),
  type: z.string().min(1, 'Move type is required')
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
  chlorophyll: z.string().optional(),
  moves: z.array(moveSchemaZod).optional().default([])
});
export const addLeaderboardEntrySchemaZod = z.object({
  userId: z.string().nonempty('User ID is required'),
  username: z.string().min(1, 'Username is required'),
  score: z.number().min(0, 'Score must be non-negative'),
  wins: z.number().optional().default(0),
  losses: z.number().optional().default(0)
});

export type AddLeaderboardEntryInput = z.infer<typeof addLeaderboardEntrySchemaZod>;
export type StorePokemonInput = z.infer<typeof storePokemonSchemaZod>;
export type StartBattleInput = z.infer<typeof startBattleSchemaZod>;
