import type { Database } from "./types";
import { Pool } from "pg";
import { Kysely, PostgresDialect } from "kysely";

const PG_URL = process.env.PG_URL;
export const pool = new Pool({
  connectionString: PG_URL as string,
});

const dialect = new PostgresDialect({
  pool: pool,
});

export const db = new Kysely<Database>({ dialect });
