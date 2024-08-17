
import type { Selectable, Updateable , Insertable} from 'kysely';
import type { Generated, ColumnType } from 'kysely';

  export interface UserTable {
    id: Generated<number>
    email: string
    first_name: string
    last_name: string | null
    password_hash: string
    created_at: ColumnType<Date, string | undefined, never>
    updated_at: ColumnType<Date, string | undefined, never>
    is_active: boolean
    last_login: Date | null
}

export interface Database {
    user: UserTable
}

export type User = Selectable<UserTable>
export type NewUser = Insertable<UserTable>
export type UserUpdate = Updateable<UserTable>
