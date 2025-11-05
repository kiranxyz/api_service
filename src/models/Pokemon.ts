import { model, Schema, Document, Types } from 'mongoose';

export interface PokemonDoc extends Document {
  userId: string;
  name: string;
  type: string;
  height: number;
  weight: number;
  stats: number;
  hp: number;
  attack: number;
  defense: number;
  specialattack: number;
  specialdefense: number;
  speed: number;
  abilities: string;
  overgrow: string;
  chlorophyll: string;
}
const pokemonSchema = new Schema<PokemonDoc>(
  {
    userId: { type: String, required: [true, 'User ID is required'] },
    name: { type: String, required: [true, 'Name is required'] },
    type: { type: String, required: [true, 'Type is required'] },
    height: { type: Number, required: [true, 'Height is required'] },
    weight: { type: Number, required: [true, 'Weight is required'] },
    stats: { type: Number, required: [true, 'Stats is required'] },
    hp: { type: Number, required: [true, 'Hp is required'] },
    attack: { type: Number, required: [true, 'Attack is required'] },
    defense: { type: Number, required: [true, 'Defense is required'] },
    specialattack: { type: Number, required: [true, 'Specialattack is required'] },
    specialdefense: { type: Number, required: [true, 'Specialdefense is required'] },
    speed: { type: Number, required: [true, 'Speed is required'] },
    abilities: { type: String, required: [true, 'Abilities is required'] },
    overgrow: { type: String, required: [true, 'Overgrow is required'] },
    chlorophyll: { type: String, required: [true, 'Chlorophyll is required'] }
  },
  {
    timestamps: true
  }
);

export default model<PokemonDoc>('Pokemon', pokemonSchema);
