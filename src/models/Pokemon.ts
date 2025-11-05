import { model, Schema, Document } from 'mongoose';

export interface PokemonDoc extends Document {
  userId: string;
  id: number;
  name: string;
  type?: string;
  height?: number;
  weight?: number;
  stats?: number;
  hp?: number;
  attack?: number;
  defense?: number;
  specialattack?: number;
  specialdefense?: number;
  speed?: number;
  abilities?: string[];
  overgrow?: string;
  chlorophyll?: string;
}

const pokemonSchema = new Schema<PokemonDoc>(
  {
    userId: { type: String, required: [true, 'User ID is required'] },
    id: { type: Number, required: [true, 'Pokemon ID is required'] },
    name: { type: String, required: [true, 'Name is required'] },
    type: { type: String, required: false },
    height: { type: Number, required: false },
    weight: { type: Number, required: false },
    stats: { type: Number, required: false },
    hp: { type: Number, required: false },
    attack: { type: Number, required: false },
    defense: { type: Number, required: false },
    specialattack: { type: Number, required: false },
    specialdefense: { type: Number, required: false },
    speed: { type: Number, required: false },
    abilities: { type: [String], required: false, default: [] },
    overgrow: { type: String, required: false },
    chlorophyll: { type: String, required: false }
  },
  { timestamps: true }
);

export default model<PokemonDoc>('Pokemon', pokemonSchema);
