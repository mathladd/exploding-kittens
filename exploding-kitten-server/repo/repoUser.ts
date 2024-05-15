import { USER_TABLE } from "../constants/dbTables";
import { query } from "../helpers/db";
import { dbErrorStatus, dbSuccessStatus } from "../template/api";
import { TableUserSchema } from "../types/repo";

export async function createUser({ username, passhash, email }) {
  try {
    const insertEmail = email ?? "NULL";
    const insertCreatedAt = new Date()
      .toISOString()
      .replace("T", " ")
      .slice(0, 19);
    const result = await query({
      text: `INSERT INTO ${USER_TABLE} (username, passhash, email, created_at) 
      VALUES ('${username}', '${passhash}', '${insertEmail}', '${insertCreatedAt}');`,
    });
    return { ...dbSuccessStatus, data: null };
  } catch (err) {
    return { ...dbErrorStatus, data: null };
  }
}

export async function readUser({
  username,
  passhash,
}: {
  username: string;
  passhash: string;
}) {
  try {
    const result = await query<TableUserSchema>({
      text: `
        SELECT * FROM ${USER_TABLE} 
        WHERE 1=1
          AND ${USER_TABLE}.username = '${username}' 
          AND ${USER_TABLE}.passhash = '${passhash}';`,
    });

    return { ...dbSuccessStatus, data: result.rows[0] };
  } catch (err) {
    console.error(err);
  }
}

export async function updateUser({
  username,
  passhash,
  lastAccess,
}: {
  username: string;
  passhash: string;
  lastAccess?: string;
}) {
  try {
    let insertLastAccess = "";
    if (lastAccess) {
      insertLastAccess = `SET last_access = '${lastAccess}'`;
    }
    const result = await query<TableUserSchema>({
      text: `
        UPDATE ${USER_TABLE}
        ${insertLastAccess}
        WHERE 1=1
          AND username = '${username}'
          AND passhash = '${passhash}';`,
    });
    return { ...dbSuccessStatus, data: result.rows[0] };
  } catch (err) {
    console.error(err);
  }
}
export function deleteUser({}) {}
