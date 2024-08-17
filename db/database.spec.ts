import { describe, it, expect } from "vitest";
import { db, pool } from "./database";

describe("database", () => {
  it("should exist", () => {
    expect(db).toBeDefined();
  });

  it("should have a good connection", () => {
    expect(db.connection.toString()).toBeDefined();
    console.log(db.connection.toString());
  });

  it("should get connected", async () => {
    let now = await pool.query("SELECT NOW()");
    const currentDateTime = now.rows[0].now;
    console.log("Current Date and Time:", currentDateTime);
    expect(now.rows[0].now).toEqual(currentDateTime);
  });
});
