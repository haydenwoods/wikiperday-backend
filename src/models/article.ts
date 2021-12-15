import { model, Document, Schema, SchemaTypes } from "mongoose";

export enum ArticleStatus {
  PENDING_INGESTION = "pendingIngestion",
  PENDING_VALIDATION = "pendingValidation",
  READY = "ready",
  DELETED = "deleted",
}

export interface IArticle {
  _id?: string;

  title?: string;
  subtitle?: string;
  description?: string;

  articleUrl: string;

  createdBy?: string | null;
}

export interface IArticleDocument extends IArticle, Document<string> {}

const articleSchema = new Schema<IArticleDocument>(
  {
    title: { type: String },
    subtitle: { type: String },
    description: { type: String },

    articleUrl: { type: String, required: true, /*unique: true*/ },

    status: { type: String, default: ArticleStatus.PENDING_INGESTION },

    createdBy: { type: SchemaTypes.ObjectId, ref: "user" },
  },
  { 
    timestamps: true
  },
);

export const Article = model<IArticleDocument>("article", articleSchema);
