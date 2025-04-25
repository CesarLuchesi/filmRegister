import pool from "../config/db.js";

const createFilmTable = async () => {
  const createEnumQuery = `
  DO $$
  BEGIN
    IF NOT EXISTS (SELECT 1 FROM pg_type WHERE typname = 'film_classification') THEN
      CREATE TYPE film_classification AS ENUM ('livre', '10', '12', '14', '16', '18');
    END IF;
  END$$;
`;
  const queryText = `
        CREATE TABLE IF NOT EXISTS films (
            id INT PRIMARY KEY GENERATED ALWAYS AS IDENTITY,
            film_name VARCHAR(100) NOT NULL,
            gender VARCHAR(100) NOT NULL,
            duration NUMERIC(3) NOT NULL,
            classification film_classification NOT NULL,
            launch DATE NOT NULL,
            synopsis TEXT NOT NULL,
            created_at TIMESTAMP DEFAULT NOW()
        );
    `;
  try {
    await pool.query(createEnumQuery);
    await pool.query(queryText);
  } catch (error) {
    console.log("Error creating film table : ", error);
  }
};

export default createFilmTable;
