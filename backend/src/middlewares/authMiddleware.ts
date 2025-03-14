import { NextFunction, Request, Response } from "express";
import { jwtConf } from "../config/jwt";
import jwt, { JwtPayload } from "jsonwebtoken";

export function authMiddleware(
  req: Request,
  res: Response,
  next: NextFunction
) {
  const authToken = req.header("Authorization");
  if (!authToken || !authToken.startsWith("Bearer ")) {
    return res.status(401).json({
      message: "Access denied: Token not provided",
    });
  }
  
  const token = authToken.split(' ')[1]

  try {
    jwt.verify(token, jwtConf.secret)

    next();
  } catch (error) {
    if (error instanceof jwt.TokenExpiredError) {
      return res.status(401).json({
        message: 'Access denied: Token expired'
      })
    }

    return res.status(401).json({
      message: 'Access denied: Invalid token'
    })
  }
}
