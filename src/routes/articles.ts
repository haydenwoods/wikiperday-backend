import express from "express";

import { asyncHandler } from "@/middleware/async";
import { auth } from "@/middleware/auth";

import { ArticlesController } from "@/controllers/articles";

const router = express.Router();

router.get("/", auth, asyncHandler(ArticlesController.getArticles));
router.post("/", auth, asyncHandler(ArticlesController.createArticle));
router.get("/:_id", auth, asyncHandler(ArticlesController.getArticle));
router.post("/:_id/ratings", auth, asyncHandler(ArticlesController.createArticleRating));
router.get("/:_id/ratings", auth, asyncHandler(ArticlesController.getArticleRatings));

export default router;