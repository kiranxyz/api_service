import Battle from '../models/Battle.ts';
import Pokemon from '../models/Pokemon.ts';
import { calcDamage, typeEffectiveness } from '../utils/battleLogic.ts';
import { v4 as uuidv4 } from 'uuid';
import { type PokemonDoc } from '../models/Pokemon.ts';

export const createBattle = async (playerPokemonId: string, oponentPokemonId: string) => {
  const playerDoc = await Pokemon.findById(playerPokemonId).lean<Partial<PokemonDoc & { moves?: any[] }>>();
  const oponentDoc = await Pokemon.findById(oponentPokemonId).lean<Partial<PokemonDoc & { moves?: any[] }>>();

  if (!playerDoc || !oponentDoc) throw new Error('Invalid pokemon ids');

  const playerSnap = {
    ...playerDoc,
    hp: playerDoc.hp ?? 100,
    moves: playerDoc.moves ?? []
  };

  const oponentSnap = {
    ...oponentDoc,
    hp: oponentDoc.hp ?? 100,
    moves: oponentDoc.moves ?? []
  };

  const roomId = uuidv4();

  const battle = await Battle.create({
    players: [
      { side: 'player', pokemonId: playerDoc._id, snapshot: playerSnap },
      { side: 'oponent', pokemonId: oponentDoc._id, snapshot: oponentSnap }
    ],
    log: [{ at: Date.now(), text: 'Battle started!' }],
    roomId
  });

  return battle;
};

export const getBattle = async (battleId: string) => {
  return Battle.findById(battleId).lean();
};

export const performMove = async (battleId: string, actorSide: 'player' | 'oponent', moveName: string) => {
  const battle = await Battle.findById(battleId);
  if (!battle) throw new Error('Battle not found');

  const actor = battle.players.find(p => p.side === actorSide);
  const defender = battle.players.find(p => p.side !== actorSide);

  if (!actor || !defender) throw new Error('Invalid battle state');

  const moves: { name: string; power: number; type: string }[] = actor.snapshot.moves ?? [];

  const move = moves.find(m => m.name === moveName);
  if (!move) throw new Error('Move not found');

  const dmg = calcDamage(actor.snapshot as PokemonDoc, defender.snapshot as PokemonDoc, move);
  defender.snapshot.hp = Math.max(0, (defender.snapshot.hp ?? defender.snapshot.hp) - dmg);

  const eff = typeEffectiveness(move.type, defender.snapshot.type ?? '');
  const effText = eff > 1 ? "It's super effective!" : eff < 1 ? "It's not very effective..." : '';

  const line = `${actor.snapshot.name} used ${move.name}! ${effText} (${dmg} dmg)`;
  battle.log.unshift({ at: Date.now(), text: line });

  if (defender.snapshot.hp <= 0) {
    const faintLine = `${defender.snapshot.name} fainted! ${actor.snapshot.name} wins!`;
    battle.log.unshift({ at: Date.now(), text: faintLine });
    battle.winner = actor.snapshot.name;
  }

  await battle.save();
  return battle;
};
