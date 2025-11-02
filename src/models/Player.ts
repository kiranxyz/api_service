import { model, Schema, Document, Types } from 'mongoose';

export interface PlayerDoc extends Document {
  name: string;
  pokemon: string;
  attackPower: number;
  score: number;
  image: string;
  type: string;
  level: number;
  winorloss: string;
}
const playerSchema = new Schema<PlayerDoc>(
  {
    name: { type: String, required: [true, 'Name is required'] },
    pokemon: { type: String, required: [true, 'Pokemon is required'] },
    attackPower: { type: Number, required: [true, 'AttackPower is required'] },
    score: { type: Number, required: [true, 'Score is required'] },
    image: { type: String, required: [true, 'Image is required'] },
    type: { type: String, required: [true, 'Type is required'] },
    level: { type: Number, required: [true, 'Level is required'] },
    winorloss: { type: String, required: [true, 'WinOrLoss is required'] }
  },
  {
    timestamps: true
  }
);

export default model<PlayerDoc>('Player', playerSchema);
