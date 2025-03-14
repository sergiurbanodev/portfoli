import { env } from "./env"

export const getCorsOptions = () => {
  return {
    origin: env.DOMAIN,
    methods: ['GET','POST','PUT','PATCH','DELETE','OPTIONS'],
    credentials: true
  }
}