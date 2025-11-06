import mongoose, { model, Schema, Document, Types } from 'mongoose';
import { type PlayerDoc } from '../models/Player.ts';

interface Scores {
  player1: number;
  player2: number;
}

export interface BattleDoc extends Document {
  players: {
    side: 'player' | 'opponent';
    pokemonId: mongoose.Types.ObjectId;
    snapshot: any;
  }[];
  log: { at: number; text: string }[];
  winner?: string;
  roomId: string;
  createdAt: Date;
}

const BattlePlayerSchema = new Schema({
  side: { type: String, required: true },
  pokemonId: { type: Schema.Types.ObjectId, required: true },
  snapshot: { type: Schema.Types.Mixed, required: true }
});

const BattleSchema = new Schema<BattleDoc>({
  players: { type: [BattlePlayerSchema], required: true },
  log: { type: [{ at: Number, text: String }], default: [] },
  winner: { type: String },
  roomId: { type: String, required: true },
  createdAt: { type: Date, default: () => new Date() }
});

export default model<BattleDoc>('Battle', BattleSchema);
