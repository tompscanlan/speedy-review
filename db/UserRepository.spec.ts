import { describe, beforeAll, it, expect, afterAll } from "vitest";
import {
  getUserById,
  createUser,
  updateUser,
  deleteUser,
} from "./UserRepository";
import { db } from "./database";

describe("UserRepository", () => {
  beforeAll(async () => {
    await db.schema
      .createTable("user")
      .addColumn("id", "serial", (c: any) => c.primaryKey())
      .addColumn("first_name", "varchar(255)")
      .addColumn("last_name", "varchar(255)")
      .addColumn("email", "varchar(255)")
      .addColumn("password_hash", "varchar(255)")
      .addColumn("is_active", "boolean", (c: any) => c.defaultTo(true))
      .addColumn("created_at", "timestamp", (c: any) => c.defaultTo(new Date()))
      .addColumn("updated_at", "timestamp", (c: any) => c.defaultTo(new Date()))
      .execute();

    db.insertInto("user")
      .values({
        first_name: "Jack",
        last_name: "Doe",
        email: "jack.doe@example.com",
        password_hash: "passwordHosh",
        is_active: true,
      })
      .returningAll()
      .executeTakeFirstOrThrow();

    // await createUser();
  });

  afterAll(async () => {
    try {
      await db.schema.dropTable("user").execute();
    } catch (error) {
      console.error(error);
      throw error;
    }
    db.destroy();
  });

  it("should find a user by id", async () => {
    try {
      let user = await getUserById(1);
      expect(user).toBeDefined();
      expect(user?.id).toBe(1);
      expect(user?.first_name).toEqual("Jack");
    } catch (error) {
      throw error;
    }
  });

  it("should create a user", async () => {
    await createUser({
      first_name: "John",
      last_name: "Doe",
      email: "john.doe@example.com",
      password_hash: "passwordHash",
      is_active: true,
    });
  });
});
