import { sign, verify } from "jsonwebtoken";

import { config } from "@/config";

import { UserJWTPayload } from "@/types/user";

import { IUserDocument } from "@/models/user";

export const getUserJWT = ({ user }: { user: IUserDocument }): string => {
  const payload: Partial<UserJWTPayload> = {
    _id: user._id, 
    version: user.jwtVersion,
  }

  const userJwt = sign(payload, config.jwt.secret, {
    expiresIn: config.jwt.expiry,
  });

  return userJwt;  
}

export const verifyUserJWT = ({ jwt }: { jwt: string }): UserJWTPayload | null => {
  try {
    const userJWTPayload = verify(jwt, config.jwt.secret) as UserJWTPayload;
    return userJWTPayload;
  } catch(error) {
    console.log(error);
    return null;
  }
}