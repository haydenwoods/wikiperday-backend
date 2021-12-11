import { model, Document, Schema, SchemaTypes } from "mongoose";

export interface IArticleRating {
  _id?: string;
  rating: -1 | 0 | 1;
  createdBy: string;
}

export interface IArticle {
  _id?: string;

  title: string;
  subtitle: string;
  description: string;

  articleUrl: string;
  
  ratings: IArticleRating[],
  ratingScores: {
    positive: number;
    negative: number;
    diff: number;
    total: number;
  }

  createdBy?: string | null;
}

export interface IArticleRatingDocument extends IArticleRating, Document<string> {}

export interface IArticleDocument extends IArticle, Document<string> {}

const articleRatingSchema = new Schema<IArticleRatingDocument>(
  {
    rating: { type: Number, enum: [-1, 1], required: true },
    createdBy: { type: SchemaTypes.ObjectId, required: true },
  },
  {
    timestamps: true,
  },
);

const articleSchema = new Schema<IArticleDocument>(
  {
    title: { type: String, required: true },
    subtitle: { type: String, required: true },
    description: { type: String, required: true },

    articleUrl: { type: String, required: true },

    ratings: [articleRatingSchema],

    createdBy: { type: SchemaTypes.ObjectId },
  },
  { 
    timestamps: true
  },
);

articleSchema.virtual("ratingScores").get(function(this: IArticleDocument) {
  const total = this.ratings.length;

  let positive = 0;
  let negative = 0;

  this.ratings.forEach((rating) => {
    switch (rating.rating) {
      case 1:
        positive++;
        break;
      case -1:
        negative++;
        break;
    }
  });

  const diff = positive - negative;

  return {
    positive,
    negative,
    diff,
    total,
  };
});

export const Article = model<IArticleDocument>("article", articleSchema);
