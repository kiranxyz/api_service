import { type Move } from '../types/types.ts';

export const typeEffectiveness = (attackType: string, opponentType: string): number => {
  const chart: Record<string, Record<string, number>> = {
    Electric: { Water: 2, Grass: 0.5 },
    Grass: { Water: 2, Fire: 0.5 },
    Fire: { Grass: 2, Water: 0.5 },
    Water: { Fire: 2, Grass: 0.5 },
    Normal: {},
    Poison: { Grass: 2 },
    Steel: { Rock: 0.5 }
  };
  return chart[attackType]?.[opponentType] ?? 1;
};

export const calcDamage = (attacker: any, oppenent: any, move: Move): number => {
  let base = move.power + (attacker.attack ?? 0) - (oppenent.defense ?? 0);
  base = Math.max(base, 1);
  const eff = typeEffectiveness(move.type, oppenent.type);
  return Math.floor(base * eff);
};
