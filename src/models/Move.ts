import { model, Schema, Document } from 'mongoose';

export interface MoveDoc extends Document {
  name: string;
  power: number;
  type?: string;
}
const moveSchema = new Schema<MoveDoc>({
  name: { type: String, required: true },
  power: { type: Number, required: true },
  type: { type: String, required: true }
});

export default model<MoveDoc>('Move', moveSchema);
