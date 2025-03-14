import dotenv from "dotenv";

dotenv.config();

const parseIntEnv = (value: string | undefined, defaultValue: number): number => {
  if (!value) return defaultValue;
  const parsed = parseInt(value, 10);
  return isNaN(parsed) ? defaultValue : parsed;
};

export const env = {

  NODE_ENV: process.env.NODE_ENV || 'dev',
  
  PORT: parseIntEnv(process.env.PORT, 8000),
  
  DOMAIN: process.env.NODE_ENV === 'production'
    ? process.env.PRODUCTION_DOMAIN || 'https://sergiurbano.com'
    : process.env.DEV_DOMAIN || 'http://localhost:3000',

  DATABASE_URL: process.env.DATABASE_URL || 'file:./dev.db',
  JWT_SECRET: process.env.JWT_SECRET || 'DummyButFullyS3cr3tK3y!',

  SALT: process.env.SALT || "12342134",
}
