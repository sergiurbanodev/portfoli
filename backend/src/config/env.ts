import dotenv from "dotenv";

dotenv.config();

export const env = {

  NODE_ENV: process.env.NODE_ENV || 'dev',
  
  PORT: parseInt(process.env.PORT || '8000', 10),
  
  PRODUCTION_DOMAIN: process.env.PRODUCTION_DOMAIN || 'http://localhost:3000',
  DEV_DOMAIN: process.env.DEV_DOMAIN || 'http://localhost:3000',

  DATABASE_URL: process.env.DATABASE_URL || 'file:./dev.db',
  JWT_SECRET: process.env.JWT_SECRET || 'DummyButFullyS3cr3tK3y!',
  
  isProduction: () => (process.env.NODE_ENV === 'production'),
}
