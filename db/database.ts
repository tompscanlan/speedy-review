import type { Database } from "./types";
import { Pool } from "pg";
import { Kysely, PostgresDialect } from "kysely";

const PG_URL = process.env.PG_URL;
const dialect = new PostgresDialect({
  pool: new Pool({
    connectionString: PG_URL as string,
  }),
});

export const db = new Kysely<Database>({ dialect });
