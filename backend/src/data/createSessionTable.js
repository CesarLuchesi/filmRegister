import pool from "../config/db.js";

const createSessionTable = async () => {
  const queryText = `
   CREATE TABLE IF NOT EXISTS sessions (
        id INT PRIMARY KEY GENERATED ALWAYS AS IDENTITY,
        cine_id INT NOT NULL REFERENCES cines(id) ON DELETE RESTRICT,
        film_id INT NOT NULL REFERENCES films(id) ON DELETE RESTRICT,
        day_week VARCHAR(20) NOT NULL,
        time TIME NOT NULL,
        created_at TIMESTAMP DEFAULT NOW() NOT NULL
    );
    `;
  try {
    await pool.query(queryText);
    console.log("Session table created if not exists");
  } catch (error) {
    console.log("Error creating Session table : ", error);
  }
};

export default createSessionTable;
