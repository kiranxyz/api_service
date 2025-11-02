import Battle, { type BattleDoc } from '../models/Battle.ts';
import Player, { type PlayerDoc } from '../models/Player.ts';
import { Types } from 'mongoose';

interface Battle {
  scores: {
    player1: number;
    player2: number;
  };
  turn: number;
  winner: string | null;
  player1: string;
  player2: string;
}

interface Player {
  id: number;
  name: number;
  pokemon: string | null;
  attackPower: string;
  score: string;
  image: string;
  type: string;
  level: number;
  winorloss: string;
}
export const runBattleTurn = (
  battle: BattleDoc,
  player1Attack: number,
  player2Attack: number,
  player1Doc: PlayerDoc,
  player2Doc: PlayerDoc
): BattleDoc => {
  if (!battle.scores) {
    battle.scores = { player1: 0, player2: 0 };
  }
  if (player1Attack > player2Attack) {
    battle.scores.player1 += 1;
  } else if (player2Attack > player1Attack) {
    battle.scores.player2 += 1;
  }
  battle.markModified('scores');

  battle.turn += 1;

  const winnerCondition = 4;
  if (battle.scores.player1 >= winnerCondition) {
    console.log('Player 1 wins the battle');
    battle.winner = player1Doc.name.toString();
    player1Doc.winorloss = 'win';
    player1Doc.score += 1;
    player2Doc.winorloss = 'loss';

    console.log('Player 1 wins the battle - updated players saved');
  } else if (battle.scores.player2 >= winnerCondition) {
    battle.winner = player2Doc.name.toString();
    player2Doc.winorloss = 'win';
    player2Doc.score += 1;
    player1Doc.winorloss = 'loss';
    player1Doc.save();
    player2Doc.save();
  }
  console.log('Battle after turn logic:', battle);
  return battle;
};
export default runBattleTurn;
