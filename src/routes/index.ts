import express from "express";

import authRouter from "@/routes/auth";
import articlesRouter from "@/routes/articles";

const router = express.Router();

router.use("/auth", authRouter);
router.use("/articles", articlesRouter);

export default router;