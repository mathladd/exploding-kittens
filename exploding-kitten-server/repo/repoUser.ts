import { query } from "../helpers/db";

export function createUser({}) {}

export async function readUser({ accessToken }: { accessToken: string }) {
  try {
    console.log(accessToken);
    const result = await query({
      text: `SELECT * FROM users WHERE users.access_token = ${accessToken}`,
    });
    // console.log("readUser result:", result.rows);
  } catch (err) {
    console.error(err);
  }
}
export function updateUser({}) {}
export function deleteUser({}) {}
