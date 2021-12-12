import validator from "validator";
import { Request, Response } from "express";

import { ArticlesService } from "@/services/articles";

import { BadRequestError, UnauthenticatedError } from "@/helpers/errors";

export class ArticlesController {
  static getArticles = async (req: Request, res: Response) => {
    let {
      limit, 
      page,
    } = req.query;

    if (!limit || typeof limit !== "string" || !validator.isNumeric(limit)) {
      limit = "50";
    }

    if (!page || typeof page !== "string" || !validator.isNumeric(page)) {
      page = "0";
    }

    const { articles } = await ArticlesService.getArticles({
      limit: parseInt(limit),
      page: parseInt(page),
    });

    res.json({
      status: "success",
      articles,
    });
  };

  static getArticle = async (req: Request, res: Response) => {
    const {
      _id,
    } = req.params;

    if (!_id || validator.isEmpty(_id)) {
      throw new BadRequestError("No article id provided.");
    }

    const { article } = await ArticlesService.getArticle({
      _id,
    });

    if (!article) {
      throw new BadRequestError("No article exists for the id provided.");
    }
    
    res.json({
      status: "success",
      article,
    });
  };

  static createArticle = async (req: Request, res: Response) => {
    const {
      user,
    } = req;

    const {
      title,
      subtitle,
      description,
      articleUrl,
    } = req.body;

    if (!user) {
      throw new UnauthenticatedError();
    }

    if (!title) {
      throw new BadRequestError("No article title provided.");
    }

    if (!subtitle) {
      throw new BadRequestError("No article subtitle provided.");
    }

    if (!description) {
      throw new BadRequestError("No article description provided.");
    }

    if (!articleUrl) {
      throw new BadRequestError("No article url provided.");
    }

    const { article } = await ArticlesService.createArticle({
      title,
      subtitle,
      description,
      articleUrl,
      createdBy: user._id,
    });

    res.json({
      status: "success",
      article,
    });
  };

  static createArticleRating = async (req: Request, res: Response) => {
    const { 
      user, 
    } = req;

    const {
      _id,
    } = req.params;

    const {
      value,
    } = req.body;

    if (!user) {
      throw new UnauthenticatedError();
    }

    if (!_id) {
      throw new BadRequestError("Id is not supplied or is invalid.");
    }

    if (!value) {
      throw new BadRequestError("Valid is not supplied or is invalid.");
    }

    const { rating } = await ArticlesService.createArticleRating({
      _id,
      userId: user._id,
      value,
    });

    res.json({
      status: "success",
      rating,
    });
  };

  static getArticleRatings = async (req: Request, res: Response) => {
    const { 
      user, 
    } = req;

    const {
      _id,
    } = req.params;

    if (!user) {
      throw new UnauthenticatedError();
    }

    if (!_id) {
      throw new BadRequestError("Id is not supplied or is invalid.");
    }

    const { ratings, aggregate } = await ArticlesService.getArticleRatings({
      _id,
    });

    res.json({
      status: "success",
      ratings,
      aggregate,
    });
  };
}