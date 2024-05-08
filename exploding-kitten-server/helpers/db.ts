const pg = require("pg");
const { Pool } = pg;

const pool = new Pool({
  user: "alien",
  password: "123456",
  host: "localhost",
  port: 5432, // default Postgres port
  database: "dogknight",
});

export const query = async ({
  text,
  params,
  callback,
}: {
  text: string;
  params?: unknown;
  callback?: () => void;
}) => {
  const start = Date.now();
  const res = await pool.query(text, params);
  const duration = Date.now() - start;
  console.log("executed query", { text, duration, rows: res.rowCount });
  return res;
};

// export const getClient = () => {
//   return pool.connect();
// };
