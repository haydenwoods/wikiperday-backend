import { NextFunction, Request, Response } from "express";

import { AuthService } from "@/services/auth";

import { UNAUTHENTICATED_ERROR } from "@/helpers/errors";

export const auth = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const jwt = req.get("Authorization");

    if (!jwt) {
      throw new Error("No JWT provided.");
    }

    const { user } = await AuthService.session({ jwt });

    req.user = user;
  } catch(error) {
    res.status(401).json({
      status: "failed",
      error: UNAUTHENTICATED_ERROR,
    });
  }

  next();
};
