import { Schema, model, Document } from 'mongoose';

export interface LeaderboardDoc extends Document {
  userId: string;
  username: string;
  score: number;
  wins: number;
  losses: number;
  createdAt: Date;
}

const leaderboardSchema = new Schema<LeaderboardDoc>(
  {
    userId: { type: String, required: true },
    username: { type: String, required: true },
    score: { type: Number, required: true, default: 0 },
    wins: { type: Number, default: 0 },
    losses: { type: Number, default: 0 }
  },
  { timestamps: true }
);

export default model<LeaderboardDoc>('Leaderboard', leaderboardSchema);
