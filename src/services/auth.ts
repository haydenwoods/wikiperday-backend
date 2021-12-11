import bcrypt from "bcrypt";

import { User, IUserDocument } from "@/models/user";

import { BadRequestError, InternalServerError, UnauthenticatedError } from "@/helpers/errors";
import { getUserJWT, verifyUserJWT } from "@/helpers/user";

export class AuthService {
  static signin = async ({ 
    email, 
    password 
  }: { 
    email: string;
    password: string;
  }) => {
    const user = await User.findOne({ email });

    if (!user) {
      throw new BadRequestError("Incorrect email or password provided.");
    }

    const passwordHash = bcrypt.hashSync(password, user.salt)

    if (passwordHash !== user.password) {
      throw new BadRequestError("Incorrect email or password provided.");
    }

    const userJwt = getUserJWT({ user });

    return {
      userJwt,
    };
  };

  static signup = async ({
    firstName,
    lastName,
    email,
    password,
  }: {
    firstName: string;
    lastName: string;
    email: string;
    password: string;
  }): Promise<{
    user: IUserDocument,
  }> => {
    const doesUserExist = await User.findOne({ email }) ? true : false;

    if (doesUserExist) {
      throw new InternalServerError(`User with this email already exists (${email}).`);
    }

    const salt = bcrypt.genSaltSync();
    const hashedPassword = bcrypt.hashSync(password, salt);

    const user = await User.create({
      firstName,
      lastName,
      email,
      password: hashedPassword,
      salt,
    });

    return {
      user,
    };
  } 

  static session = async ({
    jwt,
  }: {
    jwt: string;
  }) => {
    const userPayload = verifyUserJWT({ jwt });

    if (!userPayload) {
      throw new UnauthenticatedError();
    }

    const { _id } = userPayload;

    const user = await User.findById(_id);

    if (!user) {
      throw new UnauthenticatedError();
    }

    if (user.jwtVersion !== userPayload.version) {
      throw new UnauthenticatedError();
    }

    return {
      user,
    };
  };
};
