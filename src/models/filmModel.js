import pool from "../config/db.js";

export const getAllFilmsServices = async () => {
  const result = await pool.query("SELECT * FROM films");
  return result.rows;
};

export const getFilmByIdService = async (id) => {
  const result = await pool.query("SELECT * FROM films WHERE id = $1", [id]);
  return result.rows[0];
};

export const createFilmService = async (
  film_name,
  gender,
  duration,
  classification,
  launch,
  synopsis
) => {
  const result = await pool.query(
    "INSERT INTO films ( film_name, gender, duration, classification, launch, synopsis) VALUES ($1, $2, $3, $4,$5,$6) RETURNING *",
    [film_name, gender, duration, classification, launch, synopsis]
  );
  return result.rows[0];
};

export const updateFilmService = async (
  film_name,
  gender,
  duration,
  classification,
  launch,
  synopsis,
  id
) => {
  const result = await pool.query(
    "UPDATE films SET film_name = $1, gender = $2, duration = $3, classification = $4, launch = $5, synopsis = $6  WHERE id = $7 RETURNING *",
    [film_name, gender, duration, classification, launch, synopsis, id]
  );
  return result.rows[0];
};

export const deleteFilmService = async (id) => {
  const result = await pool.query(
    "DELETE FROM films WHERE id = $1 RETURNING *",
    [id]
  );
  return result.rows[0];
};
