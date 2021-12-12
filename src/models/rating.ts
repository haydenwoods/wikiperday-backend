import { model, Document, Schema, SchemaTypes } from "mongoose";

export interface IRating {
  _id?: string;
  ref: string;
  value: -1 | 0 | 1;
  createdBy: string;
}

export interface IRatingDocument extends IRating, Document<string> {}

const ratingSchema = new Schema<IRatingDocument>(
  {
    ref: { type: SchemaTypes.ObjectId, required: true },
    value: { type: Number, enum: [-1, 1], required: true },
    createdBy: { type: SchemaTypes.ObjectId, required: true },
  },
  {
    timestamps: true,
  },
);

export const Rating = model<IRatingDocument>("rating", ratingSchema);
