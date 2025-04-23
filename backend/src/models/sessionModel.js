import pool from "../config/db.js";

export const getAllSessionsService = async () => {
  const result = await pool.query(`
    SELECT 
      s.id,
      f.id as film_id,
      f.film_name,
      f.gender,
      f.duration,
      f.classification,
      c.id as cine_id,
      c.cine_name,
      c.city,
      c.state,
      json_agg(
        json_build_object(
          'day_week', ss.day_week,
          'time', ss.time
        )
      ) as schedules
    FROM sessions s
    JOIN films f ON s.film_id = f.id
    JOIN cines c ON s.cine_id = c.id
    LEFT JOIN session_schedules ss ON ss.session_id = s.id
    GROUP BY s.id, f.id, c.id
  `);

  return result.rows;
};

export const getSessionByIdService = async (id) => {
  const result = await pool.query(
    `
     SELECT 
      s.id,
      f.id as film_id,
      f.film_name,
      f.gender,
      f.duration,
      f.classification,
      c.id as cine_id,
      c.cine_name,
      c.city,
      c.state,
      json_agg(
        json_build_object(
          'day_week', ss.day_week,
          'time', ss.time
        )
      ) as schedules
      FROM sessions s
      JOIN films f ON s.film_id = f.id
      JOIN cines c ON s.cine_id = c.id
      LEFT JOIN session_schedules ss ON ss.session_id = s.id
      WHERE s.id = $1
       GROUP BY s.id, f.id, c.id
    `,
    [id]
  );

  return result.rows[0];
};

export const createSessionService = async (cine_id, film_id, schedules) => {
  const filmExists = await pool.query("SELECT id FROM films WHERE id = $1", [
    film_id,
  ]);
  const cineExists = await pool.query("SELECT id FROM cines WHERE id = $1", [
    cine_id,
  ]);

  if (filmExists.rows.length === 0 || cineExists.rows.length === 0) {
    throw new Error("Film or cinema not found");
  }
  const client = await pool.connect();
  try {
    await client.query("BEGIN");
    const sessionResult = await client.query(
      "INSERT INTO sessions (cine_id, film_id) VALUES ($1, $2) RETURNING *",
      [cine_id, film_id]
    );
    const session = sessionResult.rows[0];
    for (const schedule of schedules) {
      await client.query(
        "INSERT INTO session_schedules (session_id, day_week, time) VALUES ($1, $2, $3)",
        [session.id, schedule.day_week, schedule.time]
      );
    }

    await client.query("COMMIT");

    const schedulesResult = await pool.query(
      "SELECT day_week, time FROM session_schedules WHERE session_id = $1",
      [session.id]
    );

    return {
      ...session,
      schedules: schedulesResult.rows,
    };
  } catch (error) {
    await client.query("ROLLBACK");
    throw error;
  } finally {
    client.release();
  }
};
export const updateSessionService = async (id, cine_id, film_id, schedules) => {
  const client = await pool.connect();
  try {
    await client.query("BEGIN");

    if (cine_id !== undefined || film_id !== undefined) {
      await client.query(
        `UPDATE sessions 
         SET 
           cine_id = COALESCE($1, cine_id),
           film_id = COALESCE($2, film_id)
         WHERE id = $3`,
        [cine_id, film_id, id]
      );
    }

    if (schedules !== undefined) {
      await client.query(
        "DELETE FROM session_schedules WHERE session_id = $1",
        [id]
      );

      for (const schedule of schedules) {
        await client.query(
          `INSERT INTO session_schedules 
           (session_id, day_week, time) 
           VALUES ($1, $2, $3)`,
          [id, schedule.day_week, schedule.time]
        );
      }
    }

    await client.query("COMMIT");

    const updatedSession = await client.query(
      "SELECT * FROM sessions WHERE id = $1",
      [id]
    );

    const updatedSchedules = await client.query(
      "SELECT day_week, time FROM session_schedules WHERE session_id = $1",
      [id]
    );

    return {
      ...updatedSession.rows[0],
      schedules: updatedSchedules.rows,
    };
  } catch (error) {
    await client.query("ROLLBACK");
    throw error;
  } finally {
    client.release();
  }
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
      f.id as film_id,
      f.film_name,
      f.gender,
      f.duration,
      f.classification,
      c.id as cine_id,
      c.cine_name,
      c.city,
      c.state,
      json_agg(
        json_build_object(
          'day_week', ss.day_week,
          'time', ss.time
        )
      ) as schedules
      FROM sessions s
      JOIN films f ON s.film_id = f.id
      JOIN cines c ON s.cine_id = c.id
      LEFT JOIN session_schedules ss ON ss.session_id = s.id
      WHERE c.id = $1
      GROUP BY s.id, f.id, c.id
     
    `,
    [cine_id]
  );

  return result.rows;
};

export const getSessionsByFilmService = async (film_id) => {
  const result = await pool.query(
    `
    SELECT 
         s.id,
      f.id as film_id,
      f.film_name,
      f.gender,
      f.duration,
      f.classification,
      c.id as cine_id,
      c.cine_name,
      c.city,
      c.state,
      json_agg(
        json_build_object(
          'day_week', ss.day_week,
          'time', ss.time
        )
      ) as schedules
      FROM sessions s
      JOIN films f ON s.film_id = f.id
      JOIN cines c ON s.cine_id = c.id
      LEFT JOIN session_schedules ss ON ss.session_id = s.id
      WHERE f.id = $1
      GROUP BY s.id, f.id, c.id
    `,
    [film_id]
  );

  return result.rows;
};
