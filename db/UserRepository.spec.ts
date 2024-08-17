import { describe, beforeAll, it, expect, afterAll } from "vitest";
import { getUserById, createUser, updateUser, deleteUser } from "./UserRepository";
import { db } from "./database"

describe('UserRepository', () => {
    beforeAll(async () => {
        await db.schema.createTable('user')
        .addColumn('id', 'serial', (c: any) => c.primaryKey())
        .addColumn('last_name', 'varchar(255)')
        .addColumn('email', 'varchar(255)')
        .addColumn('created_at', 'timestamp', (c: any) => c.defaultTo(new Date()))
        .addColumn('updated_at', 'timestamp', (c: any) => c.defaultTo(new Date()))
        .execute()
    })
})

afterAll(async () => {
    await db.schema.dropTable('user').execute()
})

it('should find a user by id', async () => {
    const user = await getUserById(1)
    expect(user).toEqual({ id: 1, first_name: 'John', last_name: 'Doe', email: 'john.doe@example.com' })

})

it('shoud create a user', async () => {
    const user = await createUser({
        first_name: 'John',
        last_name: 'Doe',
        email: 'john.doe@example.com',
        password_hash: 'passwordHash',
        is_active: true
     })
    expect(user).toEqual({ id: 1, first_name: 'John', last_name: 'Doe', email: 'john.doe@example.com' })
})