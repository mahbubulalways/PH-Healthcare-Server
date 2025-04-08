import path from "path";
import dotenv from "dotenv";

dotenv.config({ path: path.join(process.cwd(), ".env") });

export const config = {
  SERVER_PORT: process.env.PORT,
};
