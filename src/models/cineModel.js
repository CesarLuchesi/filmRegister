import pool from "../config/db.js";

export const getAllCinesServices = async () => {
  const result = await pool.query("SELECT * FROM cines");
  return result.rows;
};

export const getCineByIdService = async (id) => {
  const result = await pool.query("SELECT * FROM cines WHERE id = $1", [id]);
  return result.rows[0];
};

export const createCineService = async (cineName, city, state) => {
  const result = await pool.query(
    "INSERT INTO cines (cineName, city, state) VALUES ($1, $2, $3) RETURNING *",
    [cineName, city, state]
  );
  return result.rows[0];
};

export const updateCineService = async (cineName, city, state, id) => {
  const result = await pool.query(
    "UPDATE cines SET cineName = $1, city = $2, state = $3 WHERE id = $4 RETURNING *",
    [cineName, city, state, id]
  );
  return result.rows[0];
};

export const deleteCineService = async (id) => {
  const result = await pool.query(
    "DELETE FROM cines WHERE id = $1 RETURNING *",
    [id]
  );
  return result.rows[0];
};
