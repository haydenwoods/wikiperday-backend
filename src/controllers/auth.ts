import validator from "validator";
import { Request, Response } from "express";

import { BadRequestError, UnauthenticatedError } from "@/helpers/errors";

import { AuthService } from "@/services/auth";

export class AuthController {
  static signin = async (req: Request, res: Response) => {
    const {
      email,
      password,
    } = req.body;

    if (!email || !validator.isEmail(email)) {
      throw new BadRequestError("Email address not provided or invalid.");
    }

    if (!password || validator.isEmpty(password)) {
      throw new BadRequestError("Password not provided.");
    }

    const { userJwt } = await AuthService.signin({ email, password });

    return res.send({
      status: "success",
      jwt: userJwt,
    });
  };

  static signup = async (req: Request, res: Response) => {
    const {
      email,
      password,
      firstName,
      lastName,
    } = req.body;

    if (!email || !validator.isEmail(email)) {
      throw new BadRequestError("Email address not provided or is invalid.");
    }

    if (!password || validator.isEmpty(password)) {
      throw new BadRequestError("Password not provided or is invalid.");
    }

    if (!firstName || validator.isEmpty(firstName)) {
      throw new BadRequestError("First name not provided.");
    }

    if (!lastName || validator.isEmpty(lastName)) {
      throw new BadRequestError("Last name not provided");
    }

    const { user } = await AuthService.signup({
      email,
      password,
      firstName,
      lastName,
    });

    return res.send({
      status: "success",
      user,
    });
  }

  static session = async (req: Request, res: Response) => {
    const { user } = req;

    return res.send({
      status: "success",
      user,
    });
  };
};