import { Pool } from "pg";
import dotenv from "dotenv";

dotenv.config();

const { POSTGRES_HOST, POSTGRES_DB, POSTGRES_USER, POSTGRES_PASSWORD } =
  process.env; //Get environment variables for POSTGRES Database

const client = new Pool({
  host: POSTGRES_HOST,
  database: POSTGRES_DB,
  user: POSTGRES_USER,
  password: POSTGRES_PASSWORD,
});

export default client;
