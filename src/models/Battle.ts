import { model, Schema, Document, Types } from 'mongoose';
import { type PlayerDoc } from '../models/Player.ts';

interface Scores {
  player1: number;
  player2: number;
}

export interface BattleDoc extends Document {
  battleId: Types.ObjectId;
  player1: Types.ObjectId | PlayerDoc;
  player2: Types.ObjectId | PlayerDoc;
  turn: number;
  scores: {
    player1: number;
    player2: number;
  };
  winner?: string;
}

const battleSchema = new Schema<BattleDoc>(
  {
    battleId: { type: Schema.Types.ObjectId, auto: true },
    player1: { type: String, required: true },
    player2: { type: String, required: true },
    turn: { type: Number, default: 1 },
    scores: {
      player1: { type: Number, default: 0 },
      player2: { type: Number, default: 0 }
    },
    winner: { type: String, default: null }
  },
  {
    timestamps: true
  }
);

export const Battle = model<BattleDoc>('Battle', battleSchema);
export default Battle;
