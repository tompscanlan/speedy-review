import { db } from './database'
import type { User, UserUpdate, NewUser } from './types'

export const getUserById = async (id: number) => {
    return db.selectFrom('user').selectAll().where('id', '=', id).executeTakeFirst()
}

export const getUserByEmail = async (email: string) => {
    return db.selectFrom('user').selectAll().where('email', '=', email).executeTakeFirst()
}

export const findUsers = async (criteria: Partial<User>) => {
    let query =  db.selectFrom('user')

    if (criteria.id) {
        query = query.where('id', '=', criteria.id)
    }
    if (criteria.email) {
        query = query.where('email', '=', criteria.email)
    }
    if (criteria.last_name) {
        query = query.where('last_name', 'ilike', `%${criteria.last_name}%`)
    }
    if (criteria.created_at) {
        query = query.where('created_at', '=', criteria.created_at)
    }

    return query.selectAll().execute()
}

export const updateUser = async (id: number, updateWith: UserUpdate) => {
    await db.updateTable('user').set(updateWith).where('id', '=', id).execute()
}

export const createUser = async (user: NewUser) => {
    return db.insertInto('user').values(user)
        .returningAll().executeTakeFirstOrThrow()
}

export const deleteUser = async (id: number) => {
    return await db.deleteFrom('user').where('id', '=', id)
        .returningAll().executeTakeFirstOrThrow()
}