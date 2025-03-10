import { env } from "./env"

export const getCorsOptions = () => {
  return {
    origin: env.isProduction() ? env.PRODUCTION_DOMAIN : env.DEV_DOMAIN,
    methods: ['GET','POST','PUT','PATCH','DELETE','OPTIONS'],
    credentials: true
  }
}