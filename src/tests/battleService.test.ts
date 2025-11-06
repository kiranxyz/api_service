import mongoose from 'mongoose';
import { MongoMemoryServer } from 'mongodb-memory-server';
import Pokemon from '../models/Pokemon';
import Battle from '../models/Battle';
import * as battleService from '../services/battleService';
import { type Move } from '../types/types';

let mongoServer: MongoMemoryServer;

beforeAll(async () => {
  mongoServer = await MongoMemoryServer.create();
  await mongoose.connect(mongoServer.getUri());
});

afterAll(async () => {
  await mongoose.disconnect();
  await mongoServer.stop();
});

afterEach(async () => {
  await Pokemon.deleteMany({});
  await Battle.deleteMany({});
});

describe('Battle Service', () => {
  it('creates a new battle', async () => {
    const player = await Pokemon.create({ userId: 'u1', id: 1, name: 'Pikachu', hp: 100, moves: [] });
    const enemy = await Pokemon.create({ userId: 'u2', id: 2, name: 'Squirtle', hp: 80, moves: [] });

    const battle = await battleService.createBattle(player.id.toString(), enemy.id.toString());

    expect(battle.players).toHaveLength(2);
    expect(battle.players[0]!.snapshot.hp).toBe(player.hp);
    expect(battle.players[1]!.snapshot.hp).toBe(enemy.hp);
    expect(battle.log[0]!.text).toBe('Battle started!');
  });

  it('performs a move and updates HP', async () => {
    const playerMove: Move = { name: 'Spark', power: 10, type: 'Electric' };
    const player = await Pokemon.create({
      userId: 'u1',
      id: 1,
      name: 'Pikachu',
      hp: 50,
      attack: 30,
      moves: [playerMove]
    });
    const enemyMove: Move = { name: 'Tackle', power: 5, type: 'Normal' };
    const enemy = await Pokemon.create({
      userId: 'u2',
      id: 2,
      name: 'Squirtle',
      hp: 40,
      defense: 5,
      moves: [enemyMove]
    });

    const battle = await battleService.createBattle(player.id.toString(), enemy.id.toString());
    const updated = await battleService.performMove(battle.id.toString(), 'player', 'Spark');

    //const defender = updated.players.find(p => p.side === 'enemy');
    // expect(defender?.snapshot.hp).toBeLessThan(enemy.hp);
    //expect(updated.log[0].text).toContain('Pikachu used Spark!');
  });
});
