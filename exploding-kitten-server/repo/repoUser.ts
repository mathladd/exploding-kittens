import { query } from "../helpers/db";

const USER_TABLE = "users";

export async function createUser({ uid, username, created_at }) {
  try {
    const result = await query({
      text: `INSERT INTO ${USER_TABLE} (uid, username, created_at) 
      VALUES (${uid}, ${username}, ${created_at});`,
    });
    console.log("readUser result:", result.rows[0]);
    return result.rows[0];
  } catch (err) {
    console.error(err);
  }
}

export async function readUser({ saltedData }: { saltedData: string }) {
  try {
    console.log(saltedData);
    const result = await query({
      text: `SELECT * FROM ${USER_TABLE} WHERE ${USER_TABLE}.saltedData = '${saltedData}';`,
    });
    console.log("readUser result:", result.rows[0]);
    return result.rows[0];
  } catch (err) {
    console.error(err);
  }
}
export function updateUser({}) {}
export function deleteUser({}) {}
