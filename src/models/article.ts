import { model, Document, Schema, SchemaTypes } from "mongoose";

export interface IArticle {
  _id?: string;

  title: string;
  subtitle: string;
  description: string;

  articleUrl: string;

  createdBy?: string | null;
}

export interface IArticleDocument extends IArticle, Document<string> {}

const articleSchema = new Schema<IArticleDocument>(
  {
    title: { type: String, required: true },
    subtitle: { type: String, required: true },
    description: { type: String, required: true },

    articleUrl: { type: String, required: true },

    createdBy: { type: SchemaTypes.ObjectId, ref: "user" },
  },
  { 
    timestamps: true
  },
);

export const Article = model<IArticleDocument>("article", articleSchema);
