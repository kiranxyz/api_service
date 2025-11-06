import { calcDamage, typeEffectiveness } from '../utils/battleLogic.ts';
import { type Move } from '../types/types';

describe('Battle Logic', () => {
  const move: Move = { name: 'Thunderbolt', power: 50, type: 'Electric' };

  const attacker = { name: 'Pikachu', attack: 30, type: 'Electric' };
  const oppenent = { name: 'Squirtle', defense: 20, type: 'Water' };

  it('calculates type effectiveness correctly', () => {
    expect(typeEffectiveness('Electric', 'Water')).toBe(2);
    expect(typeEffectiveness('Electric', 'Grass')).toBe(0.5);
    expect(typeEffectiveness('Electric', 'Fire')).toBe(1);
  });

  it('calculates damage correctly', () => {
    const dmg = calcDamage(attacker, oppenent, move);
    expect(dmg).toBe(120);
  });

  it('ensures minimum damage is 1', () => {
    const weakMove: Move = { name: 'Tackle', power: 1, type: 'Normal' };
    const lowAtk = { attack: 0 };
    const highDef = { defense: 100, type: 'Normal' };
    const dmg = calcDamage(lowAtk, highDef, weakMove);
    expect(dmg).toBe(1);
  });
});
