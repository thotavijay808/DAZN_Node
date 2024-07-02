import { Schema, Document } from 'mongoose';

export interface Movie extends Document {
  title: string;
  genre: string;
  rating: number;
  streamingLink: string;
}

export const MovieSchema = new Schema({
  title: { type: String, required: true },
  genre: { type: String, required: true },
  rating: { type: Number, required: true },
  streamingLink: { type: String, required: true },
});
