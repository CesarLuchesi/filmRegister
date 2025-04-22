import pool from "../config/db.js";

export const getAllSessionsService = async () => {
  const result = await pool.query(`
    SELECT 
      s.id,
      s.day_week,
      s.time,
      f.id as film_id,
      f.film_name,
      f.gender,
      f.duration,
      f.classification,
      c.id as cine_id,
      c.cine_name,
      c.city,
      c.state
    FROM sessions s
    JOIN films f ON s.film_id = f.id
    JOIN cines c ON s.cine_id = c.id
  `);
  return result.rows;
};

export const getSessionByIdService = async (id) => {
  const result = await pool.query(
    `
      SELECT 
        s.id,
        s.day_week,
        s.time,
        f.id as film_id,
        f.film_name,
        f.gender,
        f.duration,
        f.classification,
        c.id as cine_id,
        c.cine_name,
        c.city,
        c.state
      FROM sessions s
      JOIN films f ON s.film_id = f.id
      JOIN cines c ON s.cine_id = c.id
      WHERE s.id = $1
    `,
    [id]
  );

  return result.rows[0];
};

export const createSessionService = async (
  cine_id,
  film_id,
  day_week,
  time
) => {
  const filmExists = await pool.query("SELECT id FROM films WHERE id = $1", [
    film_id,
  ]);
  const cineExists = await pool.query("SELECT id FROM cines WHERE id = $1", [
    cine_id,
  ]);

  if (filmExists.rows.length === 0 || cineExists.rows.length === 0) {
    throw new Error("Film or cinema not found");
  }

  const result = await pool.query(
    "INSERT INTO sessions (cine_id, film_id, day_week, time) VALUES ($1, $2, $3, $4) RETURNING *",
    [cine_id, film_id, day_week, time]
  );
  return result.rows[0];
};

export const updateSessionService = async (
  cine_id,
  film_id,
  day_week,
  time,
  id
) => {
  const result = await pool.query(
    "UPDATE sessions SET cine_id = $1, film_id = $2, day_week = $3, time = $4 WHERE id = $5 RETURNING *",
    [cine_id, film_id, day_week, time, id]
  );
  return result.rows[0];
};

export const deleteSessionService = async (id) => {
  const result = await pool.query(
    "DELETE FROM sessions WHERE id = $1 RETURNING *",
    [id]
  );
  return result.rows[0];
};

export const getSessionsByCineIdService = async (cine_id) => {
  const result = await pool.query(
    `
      SELECT 
        s.id,
        s.day_week,
        s.time,
        f.id as film_id,
        f.film_name,
        f.gender,
        f.duration,
        f.classification,
        c.id as cine_id,
        c.cine_name,
        c.city,
        c.state
      FROM sessions s
      JOIN films f ON s.film_id = f.id
      JOIN cines c ON s.cine_id = c.id
      WHERE c.id = $1
    `,
    [cine_id]
  );

  return result.rows;
};

export const getSessionsByFilmService = async (film_id) => {
  const result = await pool.query(
    `
    SELECT 
      s.id AS session_id,
      s.day_week,
      s.time,
      f.id AS film_id,
      f.film_name,
      f.gender,
      f.duration,
      f.classification,
      c.id AS cine_id,
      c.cine_name,
      c.city,
      c.state
    FROM sessions s
    INNER JOIN films f ON s.film_id = f.id
    INNER JOIN cines c ON s.cine_id = c.id
    WHERE f.id = $1
    ORDER BY s.day_week, s.time
  `,
    [film_id]
  );
  return result.rows;
};
