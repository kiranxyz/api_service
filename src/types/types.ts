import { z } from 'zod/v4';
export type Move = { name: string; power: number; type: string };
export interface Pokemon {
  userId: string;
  id: number;
  name: string;
  type?: string;
  height?: number;
  weight?: number;
  stats?: number;
  hp?: number;
  attack?: number;
  defense?: number;
  specialattack?: number;
  specialdefense?: number;
  speed?: number;
  abilities?: string[];
  overgrow?: string;
  chlorophyll?: string;
}
export type BattleLogLine = { at: number; text: string };
