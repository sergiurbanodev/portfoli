import { env } from "./env";

export const jwtConf = {
  secret: env.JWT_SECRET,
  expiresIn: 7 * 24 * 60 * 60
}