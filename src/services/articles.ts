import { Article } from "@/models/article";

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
    _id: string;
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
    title: string;
    subtitle: string;
    description: string;
    articleUrl: string;
    createdBy?: string;
  }) => {
    const article = await Article.create({
      title,
      subtitle,
      description,
      articleUrl,
      createdBy,
    });

    return {
      article,
    };
  };
}