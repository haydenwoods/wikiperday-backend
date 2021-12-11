import express from "express";

import { asyncHandler } from "@/middleware/async";
import { auth } from "@/middleware/auth";

import { AuthController } from "@/controllers/auth";

const router = express.Router();

router.post("/signin", asyncHandler(AuthController.signin));
router.post("/signup", asyncHandler(AuthController.signup));
router.get("/session", auth, asyncHandler(AuthController.session));

export default router;