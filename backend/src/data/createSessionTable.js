import pool from "../config/db.js";

const createSessionTable = async () => {
  const queryText = `
   CREATE TABLE IF NOT EXISTS sessions (
        id INT PRIMARY KEY GENERATED ALWAYS AS IDENTITY,
        cine_id INT NOT NULL REFERENCES cines(id) ON DELETE RESTRICT,
        film_id INT NOT NULL REFERENCES films(id) ON DELETE RESTRICT,
        created_at TIMESTAMP DEFAULT NOW() NOT NULL
    );
    `;
  const querySchedule = `
    CREATE TABLE IF NOT EXISTS session_schedules (
      id INT PRIMARY KEY GENERATED ALWAYS AS IDENTITY,
      session_id INTEGER REFERENCES sessions(id) ON DELETE CASCADE,
      day_week VARCHAR(10) NOT NULL,
      time TIME NOT NULL,
      created_at TIMESTAMP DEFAULT NOW() NOT NULL
    );
    `;
  try {
    await pool.query(querySchedule);
    console.log("Session schedule table created if not exists");
    await pool.query(queryText);
    console.log("Session table created if not exists");
  } catch (error) {
    console.log("Error creating Session table : ", error);
  }
};

export default createSessionTable;
