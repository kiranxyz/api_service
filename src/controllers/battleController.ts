import type { RequestHandler } from 'express';
import Battle, { type BattleDoc } from '../models/Battle.ts';
import Player, { type PlayerDoc } from '../models/Player.ts';

import runBattleTurn from '../utils/battleLogic.ts';
import { isValidObjectId } from 'mongoose';

export const startBattle: RequestHandler = async (req, res) => {
  try {
    const { player1, player2 } = req.body;
    if (!player1 || !player2) {
      return res.status(400).json({ message: 'All fields player1, player2, name, pokemon are required.' });
    }
    const newBattle = await Battle.create({
      player1,
      player2,
      turn: 1,
      scores: { player1: 0, player2: 0 },
      winner: null
    });
    console.log('New battle created:', newBattle);
    await newBattle.save();
    res.status(201).json(newBattle);
  } catch (error) {
    res.status(500).json({ message: 'Internal server error', error });
  }
};

export const playTurn: RequestHandler = async (req, res) => {
  try {
    const { battleId } = req.params;
    const { player1Attack, player2Attack } = req.body;
    console.log('Received playTurn request with data:', { battleId, player1Attack, player2Attack });
    if (!battleId || !player1Attack || !player2Attack) {
      return res.status(400).json({ message: 'battleId, player1Attack, and player2Attack are required.' });
    }
    const battle = (await Battle.findById(battleId).populate('player1').populate('player2')) as BattleDoc;
    console.log('Fetched battle:', battle);
    if (!battle) {
      return res.status(404).json({ message: 'Battle not found.' });
    }
    const player1Doc = battle.player1 as PlayerDoc;
    const player2Doc = battle.player2 as PlayerDoc;

    console.log('Fetched players:', { player1Doc, player2Doc });
    runBattleTurn(battle, player1Attack, player2Attack, player1Doc, player2Doc);
    //console.log(await player1Doc.save());
    // await player2Doc.save();
    const updatedBattle = await battle.save();
    console.log('Updated battle after turn:', updatedBattle);
    return res.status(200).json(updatedBattle);
  } catch (error) {
    res.status(500).json({ message: 'Internal server error', error });
  }
};

export const status: RequestHandler = async (req, res) => {
  try {
    const { battleId } = req.params;
    if (!battleId) {
      return res.status(400).json({ message: 'BattleId is required.' });
    }
    const battle = await Battle.findById(battleId)
      .populate<{ player1: PlayerDoc; player2: PlayerDoc }>('player1 player2')
      .exec();

    if (!battle) {
      return res.status(404).json({ message: 'Battle not found.' });
    }

    res.status(200).json({
      battle,
      player1: battle.player1,
      player2: battle.player2
    });
  } catch (error) {
    res.status(500).json({ message: 'Internal server error', error });
  }
};

export const getAllBattles: RequestHandler = async (req, res) => {
  try {
    const battles = await Battle.find().populate('player1').populate('player2');
    res.status(200).json(battles);
  } catch (error) {
    res.status(500).json({ message: 'Internal server error', error });
  }
};

export const getBattleById: RequestHandler = async (req, res) => {
  const { battleId } = req.params;
  if (!isValidObjectId(battleId)) {
    return res.status(400).json({ message: 'Invalid battle ID format.' });
  }
  try {
    const battle = await Battle.findById(battleId).populate('player1').populate('player2');
    if (!battle) {
      return res.status(404).json({ message: 'Battle not found.' });
    }
    res.status(200).json(battle);
  } catch (error) {
    res.status(500).json({ message: 'Internal server error', error });
  }
};
