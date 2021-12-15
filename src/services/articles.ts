import { Article, IArticle } from "@/models/article";
import { IRating, Rating } from "@/models/rating";
import { IUser, User } from "@/models/user";

import { BadRequestError } from "@/helpers/errors";
import { aggregateRatings } from "@/helpers/ratings";
import { ingestArticle } from "@/queues/articles";

export class ArticlesService {
  static getArticles = async ({
    limit,
    page,
  }: {
    limit: number;
    page: number;
  }) => {
    const articles = await Article
      .find()
      .skip(limit * page)
      .limit(limit)
      .lean();

    return {
      articles,
    };
  };

  static getArticle = async ({
    _id,
  }: {
    _id: IArticle["_id"];
  }) => {
    const article = await Article.findById(_id);

    return {
      article,
    };
  };

  static createArticle = async ({
    title,
    subtitle,
    description,
    articleUrl,
    createdBy,
  }: {
    title?: IArticle["title"];
    subtitle?: IArticle["subtitle"];
    description?: IArticle["description"];
    articleUrl: IArticle["articleUrl"];
    createdBy?: IArticle["createdBy"];
  }) => {
    const article = await Article.create({
      title,
      subtitle,
      description,
      articleUrl,
      createdBy,
    });

    ingestArticle(article);

    return {
      article,
    };
  };

  static createArticleRating = async ({
    _id,
    userId,
    value,
  }: {
    _id: IArticle["_id"];
    userId: IUser["_id"];
    value: IRating["value"];
  }) => {
    const article = await Article.findById(_id);

    if (!article) {
      throw new BadRequestError("No article could be found to match provided id.");
    }

    const existingRating = await Rating.findOne({
      ref: _id,
      createdBy: userId,
    });

    let rating;

    if (existingRating) {
      const isDifferent = existingRating?.value !== value;

      if (!isDifferent) {
        throw new BadRequestError("Rating already exists and has matching value to requested update.");
      }

      rating = await Rating.findByIdAndUpdate(existingRating._id, {
        value,
      }, { new: true });
    } else {
      rating = await Rating.create({
        ref: _id,
        createdBy: userId,
        value,
      });
    }

    return {
      rating,
    };
  };

  static getArticleRatings = async ({
    _id,
  }: {
    _id: IArticle["_id"];
  }) => {
    const article = await Article.findById(_id);

    if (!article) {
      throw new BadRequestError("No article could be found to match the provided id.");
    }

    const ratings = await Rating.find({
      ref: _id,
    }).lean();

    const aggregate = aggregateRatings({ ratings });

    return {
      ratings,
      aggregate,
    };
  };
}