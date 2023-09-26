import dotenv from "dotenv";
dotenv.config();

export default {
  PORT: process.env.PORT || 8080,
  DB_URL: process.env.DB_URL || "",
  JWT_SECRET: process.env.JWT_SECRET || "iwrfdbexhdnouh",
  BASE_URL: process.env.BASE_URL || 'localhost',
};
