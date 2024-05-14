import { query } from "../helpers/db";
import { getErrorStatus, getSuccessStatus } from "../template/api";

const USER_TABLE = "users";

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
    return getSuccessStatus(undefined);
  } catch (err) {
    return getErrorStatus(err);
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
    const result = await query({
      text: `
        SELECT * FROM ${USER_TABLE} 
        WHERE 1=1
          AND ${USER_TABLE}.username = '${username}' 
          AND ${USER_TABLE}.passhash = '${passhash}';`,
    });

    return result.rows[0];
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
    const result = await query({
      text: `
        UPDATE ${USER_TABLE}
        ${insertLastAccess}
        WHERE 1=1
          AND username = '${username}'
          AND passhash = '${passhash}';`,
    });
    return result.rows[0];
  } catch (err) {
    console.error(err);
  }
}
export function deleteUser({}) {}
