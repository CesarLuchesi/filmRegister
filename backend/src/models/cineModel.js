import pool from "../config/db.js";

export const getAllCinesServices = async () => {
  const result = await pool.query("SELECT * FROM cines");
  return result.rows;
};

export const getCineByIdService = async (id) => {
  const result = await pool.query("SELECT * FROM cines WHERE id = $1", [id]);
  return result.rows[0];
};

export const createCineService = async (cine_name, city, state) => {
  const result = await pool.query(
    "INSERT INTO cines (cine_name, city, state) VALUES ($1, $2, $3) RETURNING *",
    [cine_name, city, state]
  );
  return result.rows[0];
};

export const updateCineService = async (cine_name, city, state, id) => {
  const result = await pool.query(
    "UPDATE cines SET cine_name = $1, city = $2, state = $3 WHERE id = $4 RETURNING *",
    [cine_name, city, state, id]
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
